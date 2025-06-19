function getCollection( client, collectionName ) {
    const database = client.db( process.env.MONGO_DATABASE_NAME )
    return database.collection( collectionName )
}

function getProjection( columns ) {
    let projection = {}
    columns.map( column => {
        projection[ column ] = 1
    } )
    return projection
}

module.exports = {
    getCollection,
    getProjection
}