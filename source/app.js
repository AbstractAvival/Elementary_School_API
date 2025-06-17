const express = require( 'express' )
const app = express()
const bodyParser = require( 'body-parser' )
const cors = require( 'cors' )
const { router } = require( './routes' )

var corsOptions = {
    allowedHeaders: [
        'X-ACCESS_TOKEN',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Origin',
        'x-requested-with',
        'Content-Type',
        'Content-Range',
        'Content-Disposition',
        'Content-Description',
    ],
    credentials: true,
    methods: 'DELETE,GET,HEAD,OPTIONS,POST,PATCH',
    origin: `http://${ process.env.ALLOWED_CONTAINER_1_HOST_NAME }:${ process.env.ALLOWED_CONTAINER_1_PORT }`
}

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )
app.use( cors( corsOptions ) )
app.use( router )

module.exports = app
