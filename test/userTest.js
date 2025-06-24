const assert = require( "chai" ).assert

const controller = require( "/app/source/http/controllers/user" )
const { UserRepository } = require( "/app/source/http/repositories/userRepository" )
const { deleteUserRequest } = require( '/app/source/http/requests/user/deleteUserRequest' )
const { indexUserRequest } = require( '/app/source/http/requests/user/indexUserRequest' )
const { showUserRequest } = require( '/app/source/http/requests/user/showUserRequest' )
const { storeUserRequest } = require( '/app/source/http/requests/user/storeUserRequest' )
const { updateUserRequest } = require( '/app/source/http/requests/user/updateUserRequest' )
const repository = new UserRepository()

const userData = [
    {
        "address_1": "Main Street",
        "address_2": "Secondary Street",
        "cellphone_1": "2063428631",
        "cellphone_2": "2063428631",
        "country": "United States",
        "country_of_birth": "United States",
        "date_of_birth": "1999-05-31",
        "email": "s_bailey2_@gmail.com",
        "first_name": "Sarah",
        "gender": "Female",
        "id": "TEST_BAILEY",
        "language": "en-us",
        "last_name": "Bailey",
        "password": "123456789",
        "password_updated_by": "test admin",
        "postal_code": "04662",
        "registered_by": "test admin",
        "role": "STFIII",
        "telephone_1": "9999999999",
        "telephone_2": "9999999999",
        "username": "Sar_bail"
    },
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
        "password": "123456789",
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
        "password": "123456789",
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
        "password": "123456789",
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
        "password": "123456789",
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

        it( "Repository - Create user", async function() {
            await repository.create( userData[ 0 ] )
            let data = await repository.get( userData[ 0 ][ "id" ] )
            assert.containsAllKeys( data[ 0 ], userData[ 0 ], "The given object does not contain the desired user data keys." )
        } )
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

    describe( "Users CRUD tests", function() {
        it( "Create user", function() {

        } )

        it( "Create user - missing id parameter", function() {

        } )

        it( "Create user - invalid id parameter", function() {

        } )

        it( "Create users - duplicate", function() {

        } )

        it( "Get users", function() {
            
        } )

        it( "Get users - pagination parameters fail 1", function() {
            
        } )

        it( "Get users - pagination parameters fail 2", function() {
            
        } )

        it( "Get users - pagination parameters fail 3", function() {
            
        } )

        it( "Get users - pagination parameters fail 4", function() {
            
        } )

        it( "Get users - pagination parameters fail 5", function() {
            
        } )

        it( "Get specific user", function() {
            
        } )

        it( "Get specific user - bad id", function() {
            
        } )

        it( "Get specific user - not found", function() {
            
        } )

        it( "Update user", function() {
            
        } )

        it( "Update user - missing id parameter", function() {
            
        } )

        it( "Update user - invalid id parameter", function() {
            
        } )

        it( "Update user - not found", function() {
            
        } )

        it( "Delete users", function() {
            
        } )

        it( "Delete user - missing id parameter", function() {

        } )

        it( "Delete user - invalid id parameter", function() {

        } )

        it( "Delete user - not found", function() {

        } )
    } )
} )