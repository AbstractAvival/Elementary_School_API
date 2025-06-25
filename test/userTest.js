const assert = require( "chai" ).assert

const { getClient } = require( "/app/source/dataAccessLayer/connections/mongoClient" )
const { getCollection } = require( "/app/source/utilities/database" )
const { getLanguageStrings } = require( '/app/source/utilities/localization' )
const { settings } = require( '/app/source/settings' )
const languageStrings = getLanguageStrings( settings.language )

const controller = require( "/app/source/http/controllers/user" )
const { UserRepository } = require( "/app/source/http/repositories/userRepository" )
const { deleteUserRequest } = require( '/app/source/http/requests/user/deleteUserRequest' )
const { indexUserRequest } = require( '/app/source/http/requests/user/indexUserRequest' )
const { showUserRequest } = require( '/app/source/http/requests/user/showUserRequest' )
const { storeUserRequest } = require( '/app/source/http/requests/user/storeUserRequest' )
const { updateUserRequest } = require( '/app/source/http/requests/user/updateUserRequest' )
const repository = new UserRepository()

const COLLECTION_NAME = "user"

const preTestUserData = [
    {
        address_1: 'Main Street',
        address_2: 'Secondary Street',
        cellphone_1: '2063428631',
        cellphone_2: '2063428631',
        country: 'United States',
        country_of_birth: 'United States',
        date_of_birth: '1999-05-31',
        email: 's_bailey2_@gmail.com',
        first_name: 'Sarah',
        gender: 'Female',
        id: 'TEST_BAILEY',
        language: 'en-us',
        last_login_date: '',
        last_name: 'Bailey',
        last_password_update: '2025-06-24 22:52:47',
        password: 'f503e972d15c74fe0766bd8c46fcfc87e4ffff447e0c5e48043e42f88ad8c170',
        password_expires_on: '2025-07-24 22:52:47',
        password_updated_by: 'test admin',
        postal_code: '04662',
        profile_photo: '',
        registered_by: 'test admin',
        registration_date: '2025-06-24 22:52:47',
        role: 'STFIII',
        salt: 'i6AzxkVrzsVqVdrl5KTzDA==',
        telephone_1: '9999999999',
        telephone_2: '9999999999',
        username: 'Sar_bail'
    }
]
const userData = [
    {
        "address_1": "1st Street",
        "address_2": "1st And a Half Street",
        "cellphone_1": "9896335465",
        "cellphone_2": "9896335465",
        "country": "United States",
        "country_of_birth": "United States",
        "date_of_birth": "1999-06-17",
        "email": "jkuzac@gmail.com",
        "first_name": "John",
        "gender": "Male",
        "id": "TEST_KUZAC",
        "language": "en-us",
        "last_name": "Kuzac",
        "registration_token": "123456789",
        "password_updated_by": "test admin",
        "postal_code": "84003",
        "registered_by": "test admin",
        "role": "STFIII",
        "telephone_1": "9999999999",
        "telephone_2": "9999999999",
        "username": "kuzac_J"
    },
    {
        "address_1": "2nd Street",
        "address_2": "2nd And a Half Street",
        "cellphone_1": "7346468531",
        "cellphone_2": "",
        "country": "United States",
        "country_of_birth": "United States",
        "date_of_birth": "1999-07-07",
        "email": "BethanyJNS@gmail.com",
        "first_name": "Bethany",
        "gender": "Female",
        "id": "TEST_JONES",
        "language": "en-us",
        "last_name": "Jones",
        "registration_token": "123456789",
        "password_updated_by": "test admin",
        "postal_code": "68023",
        "registered_by": "test admin",
        "role": "STFIII",
        "telephone_1": "9999999999",
        "telephone_2": "9999999999",
        "username": "beth_jones"
    },
    {
        "address_1": "3rd Street",
        "address_2": "3rd And a Half Street",
        "cellphone_1": "5056195590",
        "cellphone_2": "3611550551",
        "country": "United States",
        "country_of_birth": "United States",
        "date_of_birth": "1999-08-22",
        "email": "sterns_ryan@gmail.com",
        "first_name": "Ryan",
        "gender": "Male",
        "id": "TEST_SIMMONS",
        "language": "en-us",
        "last_name": "Simmons",
        "registration_token": "123456789",
        "password_updated_by": "test admin",
        "postal_code": "30022",
        "registered_by": "test admin",
        "role": "STFIII",
        "telephone_1": "9999999999",
        "telephone_2": "9999999999",
        "username": "sterns_r"
    },
    {
        "address_1": "4th Street",
        "address_2": "4th And a Half Street",
        "cellphone_1": "3611550551",
        "cellphone_2": "3611550551",
        "country": "United States",
        "country_of_birth": "United States",
        "date_of_birth": "1999-09-30",
        "email": "d_rae_martin@gmail.com",
        "first_name": "Desirae",
        "gender": "Female",
        "id": "TEST_MARTIN",
        "language": "en-us",
        "last_name": "Martin",
        "registration_token": "123456789",
        "password_updated_by": "test admin",
        "postal_code": "30022",
        "registered_by": "test admin",
        "role": "STFIII",
        "telephone_1": "9999999999",
        "telephone_2": "9999999999",
        "username": "d_rae_martin"
    }
]

describe( "User Test Suite", function() {
    describe( "User Repository Tests", function() {
        before( async function() {
            const client = getClient()
            try {
                const collection = getCollection( client, COLLECTION_NAME )
                await collection.insertOne( preTestUserData[ 0 ] )
            } catch( error ) {
                throw error
            }
        } )

        it( "User Repository should exist", function() {
            assert.exists( repository )
        } )

        it( "'Create' method should exist.", function () {
            assert.exists( repository.create )
            assert.isFunction( repository.create )
        } )

        it( "'Delete' method should exist.", function () {
            assert.exists( repository.delete )
            assert.isFunction( repository.delete )
        } )

        it( "'Get' method should exist.", function () {
            assert.exists( repository.get )
            assert.isFunction( repository.get )
        } )

        it( "'List' method should exist.", function () {
            assert.exists( repository.list )
            assert.isFunction( repository.list )
        } )

        it( "'Update' method should exist.", function () {
            assert.exists( repository.update )
            assert.isFunction( repository.update )
        } )

        it( "Repository - Get user", async function() {
            let data = await repository.get( preTestUserData[ 0 ][ "id" ] )
            assert.containsAllKeys( data[ 0 ], preTestUserData[ 0 ], "The recovered record does not match the original record." )
        } )

        it( "Repository - Create user", async function() {
            await repository.create( userData[ 0 ] )
            let data = await repository.get( userData[ 0 ][ "id" ] )
            let testUser = userData[ 0 ]
            delete testUser.registration_token
            assert.containsAllKeys( data[ 0 ], testUser, "The created record does not contain all of the given user data." )
        } )

        it( "Repository - Create user fail - duplicate entry", async function() {
            try {
                await repository.create( userData[ 0 ] )
                assert.fail( "Duplicate entry error was supposed to be thrown." )
            } catch( error ) {
                assert.equal( error.message, languageStrings.errorMessages.record_already_exists, "The message of the error is not equal to the predefined message." )
                assert.equal( error.name, "DuplicateRecordError", "The name of the error is not equal to the predefined name." )
                assert.equal( error.statusCode, 409, "The status code of the error was supposed to be 409." )
            }
        } )

        before( async function() {
            await repository.create( userData[ 1 ] )
            await repository.create( userData[ 2 ] )
            await repository.create( userData[ 3 ] )
        } )

        it( "Repository - List users", async function() {
            let data = await repository.list()
            let testTestUsers = userData
            testTestUsers.map( element => { delete element.registration_token } )
            assert.hasAllKeys( data, [ "current_page", "data", "per_page", "total_entries", "total_pages" ], "The repository response does not have the required structure." )
            assert.strictEqual( data.total_entries, 5, "There should only be 5 records in the database." )
            assert.containsAllKeys( data.data[ 0 ], preTestUserData[ 0 ], "The recovered record does not match the original record." )
            assert.containsAllKeys( data.data[ 1 ], testTestUsers[ 0 ], "The recovered record does not match the original record." )
            assert.containsAllKeys( data.data[ 2 ], testTestUsers[ 1 ], "The recovered record does not match the original record." )
            assert.containsAllKeys( data.data[ 3 ], testTestUsers[ 3 ], "The recovered record does not match the original record." )
            assert.containsAllKeys( data.data[ 4 ], testTestUsers[ 2 ], "The recovered record does not match the original record." )
        } )

        it( "Repository - Update user", async function() {
            let updateData = {
                "first_name": "Test",
                "last_name": "Update",
                "cellphone_1": "0000000000",
                "telephone_1": "0000000000",
                "postal_code": "11223",
            }
            let updatedUser = await repository.update( userData[ 1 ][ "id" ], updateData )
            assert.equal( updatedUser[ 0 ].first_name, updateData[ "first_name" ], "The record was not correctly updated." )
            assert.equal( updatedUser[ 0 ].last_name, updateData[ "last_name" ], "The record was not correctly updated." )
            assert.equal( updatedUser[ 0 ].cellphone_1, updateData[ "cellphone_1" ], "The record was not correctly updated." )
            assert.equal( updatedUser[ 0 ].telephone_1, updateData[ "telephone_1" ], "The record was not correctly updated." )
            assert.equal( updatedUser[ 0 ].postal_code, updateData[ "postal_code" ], "The record was not correctly updated." )
        } )

        it( "Repository - Update user fail - not found", async function() {
            try {
                await repository.update( "DOESNT_EXIST" )
                assert.fail( "Not found error was supposed to be thrown." )
            } catch( error ) {
                assert.equal( error.message, languageStrings.errorMessages.not_found, "The message of the error is not equal to the predefined message." )
                assert.equal( error.name, "NotFoundError", "The name of the error is not equal to the predefined name." )
                assert.equal( error.statusCode, 404, "The status code of the error was supposed to be 409." )
            }
        } )

        it( "Repository - Delete user", async function() {
            let acknowledged = await repository.delete( userData[ 2 ][ "id" ] )
            assert.strictEqual( acknowledged, true, "The delete transaction was not acknowledged." )
        } )

        it( "Repository - Delete user fail - not found", async function() {
            try {
                await repository.delete( "DOESNT_EXIST" )
                assert.fail( "Not found error was supposed to be thrown." )
            } catch( error ) {
                assert.equal( error.message, languageStrings.errorMessages.not_found, "The message of the error is not equal to the predefined message." )
                assert.equal( error.name, "NotFoundError", "The name of the error is not equal to the predefined name." )
                assert.equal( error.statusCode, 404, "The status code of the error was supposed to be 409." )
            }
        } )

        // after( async function() {
        //     const client = getClient()
        //     try {
        //         const collection = getCollection( client, COLLECTION_NAME )
        //         await collection.deleteMany( {} )
        //     } catch( error ) {
        //         throw error
        //     }
        // } )
    } )

    describe( "User Request Tests", function() {
        it( "Create user request should exist", function() {
            assert.exists( storeUserRequest )
        } )

        it( "Delete user request should exist", function() {
            assert.exists( deleteUserRequest )
        } )

        it( "Index user request should exist", function() {
            assert.exists( indexUserRequest )
        } )

        it( "Show user request should exist", function() {
            assert.exists( showUserRequest )
        } )

        it( "Update user request should exist", function() {
            assert.exists( updateUserRequest )
        } )
    } )

    describe( "User Controller Tests", function() {
        it( "User Controller should exist", function() {
            assert.exists( controller )
        } )

        it( "'Delete' method should exist.", function () {
            assert.exists( controller.delete )
            assert.isFunction( controller.delete )
        } )

        it( "'Get' method should exist.", function () {
            assert.exists( controller.get )
            assert.isFunction( controller.get )
        } )

        it( "'Put' method should exist.", function () {
            assert.exists( controller.put )
            assert.isFunction( controller.put )
        } )
    } )
} )