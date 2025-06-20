const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

function duplicateEntryResponse( errorCode = 409, message = languageStrings.errorMessages.entry_already_exists, additionalDetails = "" ) {
    return JSON.stringify( {
        response_status: errorCode,
        message: message,
        additional_details: additionalDetails
    } )
}

module.exports = {
    duplicateEntryResponse
}