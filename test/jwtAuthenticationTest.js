const { JwtAuthenticationService } = require( "/app/source/http/services/jwt/authentication" )
const authenticationService = new JwtAuthenticationService()

describe( "JWT Authentication Test Suite", function() {
    describe( "JWT Service Tests", function() {
        it( "'JwtAuthenticationService should exist.", function() {
            assert.exists( authenticationService )
        } )

        it( "'createJWTToken method should exist.", function() {
            assert.exists( authenticationService.createJWTToken )
            assert.isFunction( authenticationService.createJWTToken )
        } )

        it( "'login' method should exist.", function() {
            assert.exists( authenticationService.login )
            assert.isFunction( authenticationService.login )
        } )

        it( "'validate' method should exist.", function() {
            assert.exists( authenticationService.validate )
            assert.isFunction( authenticationService.validate )
        } )
    } )

    describe( "JWT Request Tests", function() {
        it( "JWT login request should exist", function() {
            assert.exists( jwtLoginRequest )
        } )
    } )
} )