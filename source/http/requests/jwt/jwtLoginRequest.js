const { errorResponse } = require( '/app/source/http/responses/errorResponse' )
const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )
const jwtSchemas = require( '/app/source/http/schemas/jwtSchemas' )

async function jwtLoginRequest( request, response, next ) {
    try {
        const body = request.body
        await jwtSchemas.loginBodySchema.validate( body )
        next()
    } catch( validationError ) {
        const additionalErrorData = validationError.errors ? validationError.errors[ 0 ] + " ( " + validationError.path + " )" : ""
        response.status( 422 ).send( errorResponse( 422, languageStrings.errorMessages.invalid_user_input, additionalErrorData ) )
    }
}

module.exports = {
    jwtLoginRequest
}