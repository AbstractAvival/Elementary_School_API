function getLanguageStrings( language ) {
    switch( language ) {
        case "en": return {
                errorMessages: ( require( "./en/errorStrings" ) ).errorStrings,
                generalMessages: ( require( "./en/generalStrings" ) ).generalStrings,
                successMessages: ( require( "./en/successStrings" ) ).successStrings
            }

        case "es": return {
                errorMessages: ( require( "./es/errorStrings" ) ).errorStrings,
                generalMessages: ( require( "./es/generalStrings" ) ).generalStrings,
                successMessages: ( require( "./es/successStrings" ) ).successStrings
            }
    }
}

module.exports = {
    getLanguageStrings
}