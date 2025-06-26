const crypto = require( 'crypto' )

// repositories
const { UserRepository } = require( "/app/source/http/repositories/userRepository" )

// utilities
const { createSecurePasswordData } = require( "/app/source/utilities/security/password" )
const { getRandomString } = require( '/app/source/utilities/strings' )
const { jwtTokenFormat } = require( "/app/source/utilities/responses/dataFormats" )

const userRepository = new UserRepository()

class JwtAuthenticationService {
    async createJWTToken( userData, secret, algorithm = "HS256" ) {
        const jose = await import( "jose" )
        const tokenId = getRandomString( parseInt( process.env.JWT_ID_LENGTH ) )
        return await new jose.SignJWT( {
            role: userData.role,
            token_id: tokenId,
            user_id: userData.id
        } )
        .setProtectedHeader( {
            alg: algorithm
        } )
        .setIssuedAt()
        .setIssuer( process.env.JWT_ISSUER )
        .setAudience( process.env.JWT_AUDIENCE )
        .setExpirationTime( process.env.JWT_EXPIRATION_TIME )
        .sign( secret )
    }

    async login( idOrUsername, password ) {
        if( await this.validate( idOrUsername, password ) ) {
            const updatedUserData = await userRepository.update( idOrUsername, {
                last_login_date: new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' )
            } )

            const requiredUserData = {
                id: updatedUserData[ 0 ].id,
                password_expires_on: updatedUserData[ 0 ].password_expires_on,
                role: updatedUserData[ 0 ].role
            }
            const secretKey = crypto.createSecretKey( process.env.JWT_SECRET, "utf-8" )
            
            return jwtTokenFormat( 
                await this.createJWTToken( requiredUserData, secretKey, process.env.JWT_ALGORITHM ),
                requiredUserData
            )
        }
        return false
    }
    
    async validate( idOrUsername, password ) {
        const authentication = await userRepository.get( idOrUsername, [ "id", "password", "salt" ] )
        if( !authentication.length ) {
            return false
        } else {
            const credentialsToBeValidated = createSecurePasswordData( password, authentication[ 0 ].salt )
            return credentialsToBeValidated.password === authentication[ 0 ].password
        }
    }
}

module.exports = { JwtAuthenticationService }