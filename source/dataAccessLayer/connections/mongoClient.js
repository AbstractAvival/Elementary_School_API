const { MongoClient } = require( 'mongodb' )
const MONGO_DATABASE_URI = `mongodb://${ process.env.MONGO_DATABASE_USERNAME }:${ process.env.MONGO_DATABASE_PASSWORD }@${ process.env.MONGO_DATABASE_CONTAINER_NAME }`

function getClient() {
    return new MongoClient( MONGO_DATABASE_URI )
}

module.exports = { 
    getClient
}