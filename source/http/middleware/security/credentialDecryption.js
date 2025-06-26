const { errorResponse } = require( '/app/source/http/responses/errorResponse' )
const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )
const { decrypt } = require( '/app/source/utilities/security/password' )

async function credentialDecryption(  request, response, next  ) {
    try{
        console.log( request.body.password )
        console.log( request.body.id_or_username )
        if( request.body.id_or_username ) request.body.id_or_username = decrypt( request.body.id_or_username )
        if( request.body.password ) request.body.password = decrypt( request.body.password )
        
        console.log( "decrypted: " )
        console.log( request.body.password )
        console.log( request.body.id_or_username )
        next()
    } catch( decryptionError ) {
        console.log( decryptionError )
        response.status( 422 ).send( errorResponse( 422, languageStrings.errorMessages.credential_decryption_failed ) )
    }
}

module.exports = {
    credentialDecryption
}