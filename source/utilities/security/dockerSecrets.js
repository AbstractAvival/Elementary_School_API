const fs = require( 'fs' )

function getSecret( objectUrl ) {
    return fs.readFileSync( objectUrl, "utf-8" )
}

module.exports = {
    getSecret
}