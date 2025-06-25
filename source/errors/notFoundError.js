const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

class NotFoundError extends Error {
    constructor( message = languageStrings.errorMessages.not_found ) {
        super( message )
        this.name = "NotFoundError"
        this.statusCode = 404
    }
}

module.exports = {
    NotFoundError
}