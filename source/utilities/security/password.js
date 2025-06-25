const crypto = require( "crypto" )
const { dockerConstants } = require( '/app/source/utilities/constants/docker' )
const { getRandomString } = require( '/app/source/utilities/strings' )
const { securityConstants } = require( '/app/source/utilities/constants/security' )

function createSecurePasswordData( password, userSalt = null ) {
    const salt = userSalt ? userSalt : getRandomString( parseInt( securityConstants.DEFAULT_SALT_BYTE_LENGTH ) )
    const saltedPassword = salt + password

    const saltedHash = crypto.createHash( "sha256" )
    saltedHash.update( saltedPassword )

    const pepperedHash = crypto.createHash( "sha256" )
    pepperedHash.update( saltedHash.digest( "hex" ) + dockerConstants.PEPPER )

    return {
        password: pepperedHash.digest( "hex" ),
        salt: salt
    }
}

function decrypt( cipherText ) {
    const decryptedData = crypto.privateDecrypt( 
        dockerConstants.RSA_PRIVATE_KEY,
        Buffer.from( cipherText, "base64" )
    )
    return decryptedData.toString( "utf8" )
}

module.exports = {
    createSecurePasswordData,
    decrypt
}