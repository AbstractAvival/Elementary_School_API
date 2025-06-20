const { getSecret } = require( '/app/source/utilities/security/dockerSecrets' )

const dockerConstants = Object.freeze( {
    JWT_SECRET: getSecret( process.env.JWT_SECRET ),
    MONGO_DATABASE_PASSWORD: getSecret( process.env.MONGO_DATABASE_PASSWORD ),
    MONGO_DATABASE_USERNAME: getSecret( process.env.MONGO_DATABASE_USERNAME ),
    PEPPER: getSecret( process.env.PEPPER ),
    RSA_PRIVATE_KEY: getSecret( process.env.RSA_PRIVATE_KEY ),
} )

module.exports = {
    dockerConstants
}