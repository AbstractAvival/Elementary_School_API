const assert = require( "chai" ).assert

describe( "User Test Suite", function() {
    describe( "User Repository Tests", function() {
        it( "User Repository should exist", function() {
            assert.exists( repository )
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

        it( "'Create' method should exist.", function () {
            assert.exists( repository.create )
            assert.isFunction( repository.create )
        } )

        it( "'Update' method should exist.", function () {
            assert.exists( repository.update )
            assert.isFunction( repository.update )
        } )
    } )

    describe( "User Request Tests", function() {
        it( "Delete user request should exist", function() {
            assert.exists( deleteUserRequest )
        } )

        it( "Index user request should exist", function() {
            assert.exists( indexUserRequest )
        } )

        it( "Show user request should exist", function() {
            assert.exists( showUserRequest )
        } )

        it( "Store user request should exist", function() {
            assert.exists( storeUserRequest )
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

        it( "'Post' method should exist.", function () {
            assert.exists( controller.list )
            assert.isFunction( controller.list )
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