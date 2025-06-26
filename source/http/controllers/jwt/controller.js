// constants
const express = require( 'express' )
const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )
const jwtController = express.Router()

// responses
const { errorResponse } = require( '/app/source/http/responses/errorResponse' )
const { successResponse } = require( '/app/source/http/responses/successResponse' )
const { unauthorizedResponse } = require( '/app/source/http/responses/unauthorizedResponse' )

// security
const { credentialDecryption } = require( '/app/source/http/middleware/security/credentialDecryption' )

// services
const { JwtAuthenticationService } = require( '/app/source/http/services/jwt/jwtAuthenticationService' )

// user requests
const { jwtLoginRequest } = require( '/app/source/http/requests/jwt/jwtLoginRequest' )

const authenticationService = new JwtAuthenticationService()

const jwtLoginMiddleware = [ credentialDecryption, jwtLoginRequest ]
jwtController.post( '/login', jwtLoginMiddleware, async ( request, response ) => {
    const loginBody = request.body
    try {
        const result = await authenticationService.login( loginBody )
        result ? response.status( 200 ).send( successResponse( 200, result ) )
            : response.status( 401 ).send( unauthorizedResponse() )
    } catch( error ) {
        switch( error.message ) {
            case languageStrings.errorMessages.user_not_found:
                response.status( 401 ).send( unauthorizedResponse() )
                break
            default:
                response.status( 500 ).send( errorResponse( 500 ) )
        }
    }
} )

module.exports = jwtController