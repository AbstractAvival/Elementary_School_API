const { MongoClient } = require( 'mongodb' )
const { dockerConstants } = require( "/app/source/utilities/constants/docker" )
const MONGO_DATABASE_URI = `mongodb://${ dockerConstants.MONGO_DATABASE_USERNAME }:${ dockerConstants.MONGO_DATABASE_PASSWORD }@${ process.env.MONGO_DATABASE_CONTAINER_NAME }`

function getClient() {
    return new MongoClient( MONGO_DATABASE_URI )
}

module.exports = { 
    getClient
}