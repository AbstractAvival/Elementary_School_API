const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )

function errorResponse( errorCode = 400, message = languageStrings.errorMessages.something_went_wrong, additionalDetails = "" ) {
    return JSON.stringify( {
        response_status: errorCode,
        message: message,
        additional_details: additionalDetails
    } )
}

module.exports = {
    errorResponse
}