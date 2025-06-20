const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

function notFoundResponse( message = null, additionalInformation = null ) {
    return JSON.stringify( {
        response_status: 404,
        message: message ?? languageStrings.errorMessages.not_found,
        additional_information: additionalInformation ?? ""
    } )
}

module.exports = {
    notFoundResponse
}