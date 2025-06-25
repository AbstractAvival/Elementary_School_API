const { getClient } = require( "/app/source/dataAccessLayer/connections/mongoClient" )

//Errors
const { DuplicateRecordError } = require( "/app/source/errors/duplicateRecordError" )
const { NotFoundError } = require( "/app/source/errors/notFoundError" )

// Utilities
const { createSecurePasswordData } = require( "/app/source/utilities/security/password" )
const { getCollection, getProjection } = require( "/app/source/utilities/database" )
const { getOffsetDate } = require( "/app/source/utilities/dates" )
const { paginationFormat } = require( "/app/source/utilities/responses/dataFormats" )
const { paginationConstants } = require( "/app/source/utilities/constants/pagination" )
const { securityConstants } = require("/app/source/utilities/constants/security")

const COLLECTION_NAME = "user"

class UserRepository {
    async create( data ) {
        const userExists = await this.get( data[ "id" ] )
        if( userExists.length ) {
            throw new DuplicateRecordError()
        }

        const client = getClient()
        try{
            const collection = getCollection( client, COLLECTION_NAME )
            const passwordOffsetDate = getOffsetDate( securityConstants.DEFAULT_PASSWORD_EXPIRATION_OFFSET_DAYS )
            
            const securePasswordData = createSecurePasswordData( data[ "registration_token" ] )

            const result = await collection.insertOne( {
                address_1: data[ "address_1" ] ?? "",
                address_2: data[ "address_2" ] ?? "",
                cellphone_1: data[ "cellphone_1" ] ?? "",
                cellphone_2: data[ "cellphone_2" ] ?? "",
                country: data[ "country" ] ?? "",
                country_of_birth: data[ "country_of_birth" ] ?? "",
                date_of_birth: data[ "date_of_birth" ] ?? "",
                email: data[ "email" ],
                first_name: data[ "first_name" ] ?? "",
                gender: data[ "gender" ] ?? "",
                id: data[ "id" ],
                language: data[ "language" ] ?? "",
                last_login_date: "",
                last_name: data[ "last_name" ] ?? "",
                last_password_update: new Date( Date.now() ).toISOString().slice( 0, 19 ).replace( 'T', ' ' ),
                password: securePasswordData.password,
                password_expires_on: passwordOffsetDate.toISOString().slice( 0, 19 ).replace( 'T', ' ' ),
                password_updated_by: data[ "password_updated_by" ] ?? "",
                postal_code: data[ "postal_code" ] ?? "",
                profile_photo: data[ "profile_photo" ] ?? "",
                registered_by: data[ "registered_by" ] ?? "",
                registration_date: new Date( Date.now() ).toISOString().slice( 0, 19 ).replace( 'T', ' ' ),
                role: data[ "role" ] ?? "",
                salt: securePasswordData.salt,
                telephone_1: data[ "telephone_1" ] ?? "",
                telephone_2: data[ "telephone_2" ] ?? "",
                username: data[ "username" ] ?? ""
            } )

            return await this.get( data[ "id" ] )
        } catch( error ) {
            //TODO add database errors
            throw error
        } finally {
            client.close()
        }
    }

    async delete( id ) {
        const userExists = await this.get( id )
        if( !userExists.length ) {
            throw new NotFoundError()
        }

        const client = getClient()
        try {
            const collection = getCollection( client, COLLECTION_NAME )
            const result = await collection.deleteOne( { id: id } )
            return result.acknowledged
        } catch( error ) {
            //TODO add database errors
            throw error
        } finally {
            client.close()
        }
    }

    async get( id, columns = [] ) {
        const client = getClient()
        try {
            const collection = getCollection( client, COLLECTION_NAME )
            let data = []

            const queryResults = await collection.find( {
                id: id
            } )
                .project( getProjection( columns ) )

            for await ( const user of queryResults ) {
                data.push( user )
            }

            return data
        } catch( error ) {
            //TODO add database errors
            throw error
        } finally {
            client.close()
        }
    }

    async list( 
        columns = [], 
        paginationParameters = { order_by: "id" } 
    ) {
        const client = getClient()
        try{
            const collection = getCollection( client, COLLECTION_NAME )
            let order = {}
            let users = []

            const orderDirection = paginationParameters?.order === "desc" ? -1 : 1
            if( paginationParameters?.order_by ) order[ paginationParameters?.order_by ] = orderDirection

            const data = await collection.find( {} )
                .limit( paginationParameters?.limit ?? paginationConstants.DEFAULT_LIMIT )
                .project( getProjection( columns ) )
                .skip( paginationParameters?.page ? ( parseInt( paginationParameters?.page - 1 ) * ( paginationParameters?.limit ?? paginationConstants.DEFAULT_LIMIT ) ) : 0 )
                .sort( order )
            
            for await ( const user of data ) {
                users.push( user )
            }

            const totalDataCount = await collection.countDocuments( {} )
            return paginationFormat( users, paginationParameters, totalDataCount )
        } catch( error ) {
            //TODO add database errors
            throw error
        } finally {
            client.close()
        }
    }

    async update( id, data ) {
        const userExists = await this.get( id )
        if( !userExists.length ) {
            throw new NotFoundError()
        }

        const client = getClient()
        try{
            const collection = getCollection( client, COLLECTION_NAME )
            const passwordOffsetDate = getOffsetDate( securityConstants.DEFAULT_PASSWORD_EXPIRATION_OFFSET_DAYS )

            const securePasswordData = createSecurePasswordData( data[ "registration_token" ], userExists[ 0 ].salt )

            const result = await collection.updateOne( 
                { id: id }, 
                {
                    $set: {
                        address_1: data[ "address_1" ] ?? userExists[ 0 ].address_1,
                        address_2: data[ "address_2" ] ?? userExists[ 0 ].address_2,
                        cellphone_1: data[ "cellphone_1" ] ?? userExists[ 0 ].cellphone_1,
                        cellphone_2: data[ "cellphone_2" ] ?? userExists[ 0 ].cellphone_2,
                        country: data[ "country" ] ?? userExists[ 0 ].country,
                        country_of_birth: data[ "country_of_birth" ] ?? userExists[ 0 ].country_of_birth,
                        date_of_birth: data[ "date_of_birth" ] ?? userExists[ 0 ].date_of_birth,
                        email: data[ "email" ] ?? userExists[ 0 ].email,
                        first_name: data[ "first_name" ] ?? userExists[ 0 ].first_name,
                        gender: data[ "gender" ] ?? userExists[ 0 ].gender,
                        language: data[ "language" ] ?? userExists[ 0 ].language,
                        last_login_date: data[ "last_login_date" ] ?? userExists[ 0 ].last_login_date,
                        last_password_update: data[ "registration_token" ] ? new Date( Date.now() ).toISOString().slice( 0, 19 ).replace( 'T', ' ' ) : userExists[ 0 ].last_password_update,
                        last_name: data[ "last_name" ] ?? userExists[ 0 ].last_name,
                        password: data[ "registration_token" ] ? securePasswordData.password : userExists[ 0 ].password,
                        password_expires_on: data[ "registration_token" ] ? passwordOffsetDate.toISOString().slice( 0, 19 ).replace( 'T', ' ' ) : userExists[ 0 ].password_expires_on,
                        password_updated_by: data[ "registration_token" ] ? data[ "password_updated_by" ] : userExists[ 0 ].password_updated_by,
                        postal_code: data[ "postal_code" ] ?? userExists[ 0 ].postal_code,
                        profile_photo: data[ "profile_photo" ] ?? userExists[ 0 ].profile_photo,
                        registered_by: data[ "registered_by" ] ?? userExists[ 0 ].registered_by,
                        registration_date: data[ "registration_date" ] ?? userExists[ 0 ].registration_date,
                        role: data[ "role" ] ?? userExists[ 0 ].role,
                        telephone_1: data[ "telephone_1" ] ?? userExists[ 0 ].telephone_1,
                        telephone_2: data[ "telephone_2" ] ?? userExists[ 0 ].telephone_2,
                        username: data[ "username" ] ?? userExists[ 0 ].username
                    } 
                }
            )

            return await this.get( id )
        } catch( error ) {
            //TODO add database errors
            throw error
        } finally {
            client.close()
        }
    }
}

module.exports = {
    UserRepository
}