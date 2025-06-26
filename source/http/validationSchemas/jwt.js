const yup = require( 'yup' )
const { schemaColumnConstants } = require( '/app/source/utilities/constants/schemaColumnConstants' )
const { regex } = require( '/app/source/utilities/regex' )

const loginBodySchema = yup.object( {
    id_or_username: yup.string().max( schemaColumnConstants.DEFAULT_MAX_ID_OR_USERNAME_VALUE ).matches( regex.only_letters_regex ).required(),
    password: yup.string().max( schemaColumnConstants.DEFAULT_MAX_PASSWORD_VALUE ).matches( regex.password_regex ).required(),
} )

module.exports = {
    paginationSchema,
    loginBodySchema
}