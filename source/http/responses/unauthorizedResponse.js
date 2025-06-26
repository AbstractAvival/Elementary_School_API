const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

function unauthorizedResponse( errorCode = 401, message = languageStrings.errorMessages.unauthorized, additionalDetails = "" ) {
    return JSON.stringify( {
        response_status: errorCode,
        message: message,
        additional_details: additionalDetails
    } )
}

module.exports = {
    unauthorizedResponse
}