const crypto = require( "crypto" )
const { dockerConstants } = require( '/app/source/utilities/constants/docker' )
const { getRandomString } = require( '/app/source/utilities/strings' )
const { securityConstants } = require( '/app/source/utilities/constants/securityConstants' )

function createSecurePasswordData( password ) {
    const salt = getRandomString( parseInt( securityConstants.DEFAULT_SALT_BYTE_LENGTH ) )
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

module.exports = {
    createSecurePasswordData
}