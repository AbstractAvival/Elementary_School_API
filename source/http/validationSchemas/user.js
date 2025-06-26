const yup = require( "yup" )
const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )
const { regex } = require( "/app/source/utilities/constants/regex" )
const { validationConstants } = require( "/app/source/utilities/constants/validation" )

const allowedColumns = [ 
    "address_1",
    "address_2",
    "cellphone_1",
    "cellphone_2",
    "country",
    "country_of_birth",
    "date_of_birth",
    "email",
    "first_name",
    "gender",
    "id",
    "language",
    "last_login_date",
    "last_name",
    "last_password_update",
    "password_expires_on",
    "password_updated_by",
    "postal_code",
    "profile_photo",
    "registered_by",
    "registration_date",
    "role",
    "telephone_1",
    "telephone_2",
    "username",
]

const deleteUserParameterSchema = yup.object( {
    id: yup.string().max( 20 ).matches( regex.id_regex ).required(),
} )

const paginationSchema = yup.object( {
    columns: yup.lazy( value => ( Array.isArray( value ) ? yup.array().of( yup.string().test( "IndexUserRequest - table columns validation", languageStrings.errorMessages.invalid_columns, ( item ) => allowedColumns.includes( item ) ) ) 
        : yup.string().max( 250 ).matches( regex.general_use_regex ).nullable().test( "IndexUserRequest - table columns validation", languageStrings.errorMessages.invalid_columns, ( item ) => {
            let areColumnsValid = true
            let columns = item.split( "," )
            for( column in columns ) {
                !allowedColumns.includes( column ) ? areColumnsValid = false : null
            }
            return areColumnsValid
        } ) ) ),
    columns: yup.array().of( yup.string().test( "IndexUserRequest - table columns validation", languageStrings.errorMessages.invalid_columns, ( item ) => allowedColumns.includes( item ) ) ),
    limit: yup.number().positive(),
    order: yup.string().test( "IndexUserRequest - order validation", languageStrings.errorMessages.invalid_order, ( item ) => !item ? true : item === "asc" || item === "desc" ),
    order_by: yup.string().test( "IndexUserRequest - order by validation", languageStrings.errorMessages.invalid_order_by, ( item ) => !item ? true : allowedColumns.includes( item ) ),
    page: yup.number().positive()
} )

const showUserParameterSchema = yup.object( {
    id: yup.string().max( 20 ).matches( regex.id_regex ).required(),
} )

const showUserQuerySchema = yup.object( {
    columns: yup.lazy( value => ( Array.isArray( value ) ? yup.array().of( yup.string().test( "showUserRequest - table columns validation", languageStrings.errorMessages.invalid_columns, ( item ) => allowedColumns.includes( item ) ) ) 
        : yup.string().max( 250 ).matches( regex.general_use_regex ).nullable().test( "showUserRequest - table columns validation", languageStrings.errorMessages.invalid_columns, ( item ) => {
            let areColumnsValid = true
            let columns = item ? item.split( "," ) : []
            for( column in columns ) {
                !allowedColumns.includes( column ) ? areColumnsValid = false : null
            }
            return areColumnsValid
        } ) ) ),
} )

const storeUserBodySchema = yup.object( {
    address_1: yup.string().max( 100 ).matches( regex.address_regex ).nullable(),
    address_2: yup.string().max( 100 ).matches( regex.address_regex ).nullable(),
    cellphone_1: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    cellphone_2: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    country: yup.string().max( 80 ).matches( regex.only_letters_regex ).nullable(),
    country_of_birth: yup.string().max( 80 ).matches( regex.only_letters_regex ).nullable(),
    date_of_birth: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    email: yup.string().email().required(),
    first_name: yup.string().max( 50 ).matches( regex.only_letters_regex ).nullable(),
    gender: yup.string().max( 20 ).matches( regex.only_letters_regex ).nullable(),
    id: yup.string().max( 20 ).matches( regex.id_regex ).required(),
    language: yup.string().max( 10 ).matches( regex.general_use_regex ).nullable(),
    last_login_date: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    last_name: yup.string().max( 50 ).matches( regex.only_letters_regex ).nullable(),
    password_updated_by: yup.string().max( 20 ).matches( regex.id_regex ).required(),
    postal_code: yup.string().max( 100 ).matches( regex.phone_regex ).nullable(),
    profile_photo: yup.object().shape( {
        image: yup.mixed().nullable()
            .test( "File format validation", languageStrings.errorMessages.invalid_file_type, ( value ) => {
                if( value ) {
                    const supportedImageFormats = [ "jpeg", "jpg", "png", "svg" ]
                    return supportedImageFormats.includes( value.name.split( "." ).pop() )
                }
                return true
            } )
            .test( "File size validation", languageStrings.errorMessages.invalid_file_size, ( value ) => {
                if( value ) {
                    return value.size <= validationConstants.DEFAULT_MAX_IMAGE_FILE_SIZE
                }
                return true
            } )
    } ),
    registered_by: yup.string().max( 20 ).matches( regex.id_regex ).required(),
    registration_date: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    registration_token: yup.string().max( 30 ).matches( regex.password_regex ).required(),
    role: yup.string().max( 30 ).matches( regex.only_letters_regex ).nullable(),
    telephone_1: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    telephone_2: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    username: yup.string().max( 30 ).matches( regex.general_use_regex ).nullable()
} )

const updateUserBodySchema = yup.object( {
    address_1: yup.string().max( 100 ).matches( regex.address_regex ).nullable(),
    address_2: yup.string().max( 100 ).matches( regex.address_regex ).nullable(),
    cellphone_1: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    cellphone_2: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    country: yup.string().max( 80 ).matches( regex.only_letters_regex ).nullable(),
    country_of_birth: yup.string().max( 80 ).matches( regex.only_letters_regex ).nullable(),
    date_of_birth: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    email: yup.string().email().nullable(),
    first_name: yup.string().max( 50 ).matches( regex.only_letters_regex ).nullable(),
    gender: yup.string().max( 20 ).matches( regex.only_letters_regex ).nullable(),
    language: yup.string().max( 10 ).matches( regex.general_use_regex ).nullable(),
    last_login_date: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    last_name: yup.string().max( 50 ).matches( regex.only_letters_regex ).nullable(),
    last_password_update: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    registration_token: yup.string().max( 30 ).matches( regex.password_regex ).nullable(),
    password_expires_on: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    password_updated_by: yup.string().max( 20 ).matches( regex.id_regex ).required(),
    postal_code: yup.string().max( 100 ).matches( regex.phone_regex ).nullable(),
    profile_photo: yup.object().shape( {
        image: yup.mixed().nullable()
            .test( "File format validation", languageStrings.errorMessages.invalid_file_type, ( value ) => {
                if( value ) {
                    const supportedImageFormats = [ "jpeg", "jpg", "png", "svg" ]
                    return supportedImageFormats.includes( value.name.split( "." ).pop() )
                }
                return true
            } )
            .test( "File size validation", languageStrings.errorMessages.invalid_file_size, ( value ) => {
                if( value ) {
                    return value.size <= validationConstants.DEFAULT_MAX_IMAGE_FILE_SIZE
                }
                return true
            } )
    } ),
    registration_date: yup.string().max( 20 ).matches( regex.date_regex ).nullable(),
    role: yup.string().max( 30 ).matches( regex.only_letters_regex ).nullable(),
    sex: yup.string().max( 15 ).matches( regex.only_letters_regex ).nullable(),
    telephone_1: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    telephone_2: yup.string().max( 16 ).matches( regex.phone_regex ).nullable(),
    username: yup.string().max( 30 ).matches( regex.general_use_regex ).nullable()
} )

const updateUserParameterSchema = yup.object( {
    id: yup.string().max( 20 ).matches( regex.id_regex ).required(),
} )

module.exports = {
    deleteUserParameterSchema,
    paginationSchema,
    showUserQuerySchema,
    showUserParameterSchema,
    storeUserBodySchema,
    updateUserBodySchema,
    updateUserParameterSchema
}