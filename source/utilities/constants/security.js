const securityConstants = Object.freeze( {
    DEFAULT_JWT_EXPIRATION_TIME: "",
    DEFAULT_PASSWORD_EXPIRATION_OFFSET_DAYS: process.env.DEFAULT_PASSWORD_EXPIRATION_OFFSET_DAYS ?? 30,
    DEFAULT_SALT_BYTE_LENGTH: process.env.DEFAULT_SALT_BYTE_LENGTH ?? 16,
} )

module.exports = {
    securityConstants
}