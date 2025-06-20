const express = require( 'express' )
const router = express.Router()

const userController = require( '/app/source/http/controllers/user' )

router.use( '/user', userController )

module.exports = {
    router
}