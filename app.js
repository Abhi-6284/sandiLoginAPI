require('dotenv').config()

// Libraries
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
// const session = require('express-session')

// Custom Libraries
const connectDB = require('./Utils/database.Util')
const root = require('./GraphQL/schema.Graphql')
const schema = require('./GraphQL/resolver.Graphql')
const Routers = require('./Routes/api.Router')

// Calling functions from Libraries

const app = express()
// app.use(cookieParser())

// // Set up session middleware
// app.use(session({
//     secret: process.env.SECRET_KEY, // Session secret key
//     resave: false, // Don't save session if unmodified
//     saveUninitialized: false // Don't create session until something stored
// }));

// Application configurations
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next) => {

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
    next()
})

// GraphQL Server
app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: root, graphiql: true }))

// My Routers
app.use('/api', Routers)


app.use((req, res) => {
    return res.status(404).send(`
      <h1 style="position: absolute;padding: 0;top: 10%;margin: 10rem 0;left: 50%;transform: translate(-50%, -50%);">
        <p style="color:red;font-size: 10rem">404</p>
      </h1>
      <h2 style="position: absolute;top: 45%;left: 50%;transform: translate(-50%, -50%);">Page Not Found!... :-(</h2>
    `)
})


// Database Connection
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running at http://${process.env.HOST}:${process.env.PORT}`)
    })
})