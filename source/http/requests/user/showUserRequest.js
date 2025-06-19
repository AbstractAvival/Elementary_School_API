const { errorResponse } = require( "/app/source/http/responses/errorResponse" )
const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )
const userSchemas = require( "/app/source/http/validationSchemas/user" )

async function showUserRequest( request, response, next ) {
    console.log( request.query )
    try {
        const parameters = request.params
        const query = request.query
        await userSchemas.showUserParameterSchema.validate( parameters )
        await userSchemas.showUserQuerySchema.validate( query )
        next()
    } catch( validationError ) {
        console.log( validationError )
        response.status( 422 ).send( errorResponse( 422, languageStrings.errorMessages.invalid_user_input, validationError.errors[ 0 ] + " ( " + validationError.path + " )" ) )
    }
}

module.exports = {
    showUserRequest
}