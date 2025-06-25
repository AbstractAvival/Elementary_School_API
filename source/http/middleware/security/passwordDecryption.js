const { errorResponse } = require( "/app/source/http/responses/errorResponse" )
const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )
const { decrypt } = require( "/app/source/utilities/security/password" )

async function passwordDecryption(  request, response, next  ) {
    try{
        if( request.body.registration_token ) {
            request.body.registration_token = decrypt( request.body.registration_token )
        }
        next()
    } catch( decryptionError ) {
        response.status( 422 ).send( errorResponse( 422, languageStrings.errorMessages.password_decryption_failed ) )
    }
}

module.exports = {
    passwordDecryption
}