const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

class DuplicateRecordError extends Error {
    constructor( message = languageStrings.errorMessages.record_already_exists ) {
        super( message )
        this.name = "DuplicateRecordError"
        this.statusCode = 409
    }
}

module.exports = {
    DuplicateRecordError
}