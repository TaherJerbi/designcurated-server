const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const http = require('http');

const {typeDefs,resolvers} = require('./photos');

// We use the express configuration to keep our app scalable.
async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // can apply middlewares to app before or after .applyMiddleware

  server.applyMiddleware({ app });

  /**
   * server.applyMiddleware({ app, ...rest }) is shorthand for app.use(server.getMiddleware(rest)).
   */

  await new Promise(resolve => httpServer.listen({ port: process.env.PORT ?? 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs,resolvers)