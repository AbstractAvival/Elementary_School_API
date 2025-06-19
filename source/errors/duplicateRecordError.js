class DuplicateRecordError extends Error {
    constructor( message = "The record already exists." ) {
        super( message )
        this.name = "DuplicateRecordError"
        this.statusCode = 409
    }
}

module.exports = {
    DuplicateRecordError
}