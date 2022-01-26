const UnspashAPI = require('./api');

let resolvers = {
    Query:{
        getPhotos:(_,{page,perPage}) => new UnspashAPI().listPhotos(page,perPage),
        searchPhotos:(_,{key,page,perPage,orientation}) => new UnspashAPI().searchPhotos(key,page,perPage,orientation),
        fetchImage:(_,{photoId}) => new UnspashAPI().getImage(photoId),
        
    }
};

module.exports = resolvers;