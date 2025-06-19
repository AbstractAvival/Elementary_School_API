class NotFoundError extends Error {
    constructor( message = "The requested record was not found." ) {
        super( message )
        this.name = "NotFoundError"
        this.statusCode = 404
    }
}

module.exports = {
    NotFoundError
}