const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type Image {
        id:ID!
        created_at:String!
        description:String
        alt_description:String
        url:String
        link:String
    }
    
    type ImageResponse {
        image:Image,
        user:User
    }

    type Link {
        self:String!
        photos:String!
        portfolio:String!
        following:String!
        followers:String!
    }
    type User {
        id:ID!
        username:String!
        name:String!
        profile_image:String
        bio:String
        location:String
        links:Link,
        total_photos:Int!
    }

    type Query {
        getPhotos(page:Int!,perPage:Int!):[ImageResponse!]!
        searchPhotos(key:String!,page:Int!,perPage:Int!,orientation:String!):[ImageResponse]!
        fetchImage(photoId:String):ImageResponse
        getUserDetails(username:String): User
        getUserPhotos(username: String,page:Int!,perPage:Int!,orientation:String!): [ImageResponse!]!
    }
`;


module.exports = typeDefs;