require( 'dotenv' ).config()
const port = process.env.PORT || 3000
const app = require( '/app/source/app' )

const startServer = () => {
	app.listen( port, () => {
		console.log( `Example app listening on port ${ port }` )
	  } )
}

startServer()