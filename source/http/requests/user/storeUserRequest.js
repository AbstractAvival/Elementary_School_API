const { errorResponse } = require( "/app/source/http/responses/errorResponse" )
const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )
const userSchemas = require( "/app/source/http/validationSchemas/user" )

async function storeUserRequest( request, response, next ) {
    try {
        const body = request.body
        await userSchemas.storeUserBodySchema.validate( body )
        next()
    } catch( validationError ) {
        response.status( 422 ).send( errorResponse( 422, languageStrings.errorMessages.invalid_user_input, validationError.errors[ 0 ] + " ( " + validationError.path + " )" ) )
    }
}

module.exports = {
    storeUserRequest
}