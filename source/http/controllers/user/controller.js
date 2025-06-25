// constants
const express = require( "express" )
const { getLanguageStrings } = require( "/app/source/utilities/localization" )
const { settings } = require( "/app/source/settings" )
const languageStrings = getLanguageStrings( settings.language )
const { paginationConstants } = require( "/app/source/utilities/constants/pagination" )
const userController = express.Router()
const { UserRepository } = require( "/app/source/http/repositories/userRepository" )

// middleware
const { passwordDecryption } = require( "/app/source/http/middleware/security/passwordDecryption" )

// responses
const { duplicateEntryResponse } = require( "/app/source/http/responses/duplicateEntryResponse" )
const { errorResponse } = require( "/app/source/http/responses/errorResponse" )
const { notFoundResponse } = require( "/app/source/http/responses/notFoundResponse" )
const { successResponse } = require( "/app/source/http/responses/successResponse" )

// user requests
const { deleteUserRequest } = require( "/app/source/http/requests/user/deleteUserRequest" )
const { indexUserRequest } = require( "/app/source/http/requests/user/indexUserRequest" )
const { showUserRequest } = require( "/app/source/http/requests/user/showUserRequest" )
const { storeUserRequest } = require( "/app/source/http/requests/user/storeUserRequest" )
const { updateUserRequest } = require( "/app/source/http/requests/user/updateUserRequest" )

const repository = new UserRepository()

const deleteUserValidationMiddleware = [ deleteUserRequest ]
userController.delete( "/:id", deleteUserValidationMiddleware, async ( request, response ) => {
    const deleteUserParameters = request.params
    try {
        const result = await repository.deleteUser( deleteUserParameters.id )

        result ? response.status( 200 ).send( successResponse( 200, [], languageStrings.successMessages.delete_success ) )
            : response.status( 404 ).send( notFoundResponse() )
    } catch( error ) {
        response.status( 500 ).send( errorResponse( 500 ) )
    }
} ) 

const indexUsersValidationMiddleware = [ indexUserRequest ]
userController.get( "/", indexUsersValidationMiddleware, async ( request, response ) => {
    const indexUserInput = request.query
    try {
        const result = await repository.listUsers( 
            indexUserInput.columns ?? [], 
            { 
                limit: parseInt( indexUserInput.limit ?? paginationConstants.DEFAULT_LIMIT ),
                order: indexUserInput.order ?? "asc",
                order_by: indexUserInput.order_by ?? "resource_id",
                page: parseInt( indexUserInput.page ?? 1 )
            } 
        )
        response.status( 200 ).send( successResponse( 200, result ) )
    } catch( error ) {
        response.status( 500 ).send( errorResponse( 500 ) )
    }
} )

const showUserValidationMiddleware = [ showUserRequest ]
userController.get( "/:resource_id", showUserValidationMiddleware, async ( request, response ) => {
    const getUserQuery = request.query
    const getUserParameters = request.params
    try {
        const result = await repository.getUser(
            getUserParameters.resource_id,
            getUserQuery.columns ?? []
        )

        result.length ? response.status( 200 ).send( successResponse( 200, result[ 0 ] ) )
            : response.status( 404 ).send( notFoundResponse() )
    } catch( error ) {
        response.status( 500 ).send( errorResponse( 500 ) )
    }
} )

const storeUserValidationMiddleware = [ passwordDecryption, storeUserRequest ]
userController.post( "/", storeUserValidationMiddleware, async ( request, response ) => {
    const storeUserBody = request.body
    try {
        const result = await repository.storeUser( storeUserBody )
        result.length ? response.status( 201 ).send( successResponse( 201, result[ 0 ] ) )
            : response.status( 409 ).send( duplicateEntryResponse() )
    } catch( error ) {
        response.status( 500 ).send( errorResponse( 500 ) )
    }
} ) 

const updateUserValidationMiddleware = [ passwordDecryption, updateUserRequest ]
userController.put( "/:resource_id", updateUserValidationMiddleware, async ( request, response ) => {
    const updateUserBody = request.body
    const updateUserParameters = request.params
    try {
        const result = await repository.updateUser( 
            updateUserParameters.resource_id,
            updateUserBody 
        )
        result.length ? response.status( 200 ).send( successResponse( 200, result[ 0 ] ) )
            : response.status( 404 ).send( notFoundResponse() )
    } catch( error ) {
        response.status( 500 ).send( errorResponse( 500 ) )
    }
} ) 

module.exports = userController