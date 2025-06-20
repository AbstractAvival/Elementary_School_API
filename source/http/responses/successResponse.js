const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

function successResponse( responseCode = 200, data = [], message = languageStrings.successMessages.success ) {
    return JSON.stringify( {
        response_status: responseCode,
        data: data,
        message: message
    } )
}

module.exports = {
    successResponse
}