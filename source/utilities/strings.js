const crypto = require( "crypto" )

function getRandomString( byteLength, stringType = "base64" ) {
    return crypto.randomBytes( byteLength ).toString( stringType )
}

module.exports = {
    getRandomString
}