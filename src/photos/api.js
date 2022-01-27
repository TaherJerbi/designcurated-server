const unsplash = require('unsplash-js')
const nodeFetch = require('node-fetch')
class UnspashAPI {
    constructor(){
        this.api = unsplash.createApi({
            accessKey:process.env.UNSPLASH_ACCESS_KEY,
            fetch: nodeFetch
        })

    }
    //restructuring image.

    async structureImage (result) {
        return {
            ...result,
            link:result['links']['download'],
            url:result['urls']['full']
        }
    }

    //restructuring user.

    async structureUser (result){
        return {
            ...result,
            profile_image:result['profile_image'] ? result['profile_image']['medium']: null
        }
    }

    //getting the photos.

    async listPhotos(page,perPage){

        let result = await this.api.photos.list({
            page,
            perPage
        }).catch(console.log)
    
        //error checking
        if(result.errors) throw new Error(result.errors[0])
    
        return result.response['results'].map((photo) => {
    
            let image = this.structureImage.bind(this,photo)
    
            let user = this.structureUser.bind(this,photo['user'])
            
            return {
                image,
                user
            }
    
        })
    
    }
    //searching for photos.

    async searchPhotos(key,page,perPage,orientation){


        let result = await this.api.search.getPhotos({
            query: key,
            page,
            perPage,
            orientation,
        })
        .catch(console.log)

        //error checking
        if(result.errors) throw new Error(result.errors[0])

        const response = {
            results: result['response']['results'].map((photo) => {


            let image = this.structureImage.bind(this,photo)

            let user = this.structureUser.bind(this,photo['user'])

            return {
                image,
                user
            }

        }),
        total: result['response']['total'],
        total_pages: result['response']['total_pages']
    }
    return response
        
    }
}

module.exports = UnspashAPI
