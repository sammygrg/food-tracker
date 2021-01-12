require("dotenv").config()
const express = require("express")
const project = express()
const ejs = require('ejs')
const path = require("path")
const PORT = process.env.PORT || 3000
const eLayout = require("express-ejs-layouts") //express layout
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const DatabaseStore = require("connect-mongo")(session)
const passport = require("passport")
const Emitter = require('events')



//database conneciton.


const url = "mongodb+srv://sammy:samundra21@stackdevelopment.p0roe.mongodb.net/food";
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, 
useFindAndModify:true});
const conneciton = mongoose.connection;
conneciton.once("open", () => {
     console.log("Database connected.");
 })
 .catch(err => {
     console.log("Connection failed...")
 });

// Event emitter
const eventEmitter = new Emitter()
project.set('eventEmitter', eventEmitter)

let mgStore = new DatabaseStore({
    mongooseConnection: conneciton,
    collection: "sessions"
})


// Session config
project.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mgStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// Passport config
const passportInit = require("./app/config/passport")
const { Socket } = require("net")
passportInit(passport)
project.use(passport.initialize())
project.use(passport.session())


project.use(flash())
// Assets
project.use(express.static('public'))
project.use(express.urlencoded({ extended: false }))
project.use(express.json())

// Global middleware
project.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
// set Template engine
project.use(eLayout)
project.set('views', path.join(__dirname, '/resources/views'))
project.set('view engine', 'ejs')

require('./routes/web')(project)
project.use((req, res) => {
    res.status(404).render('errors/404')
})

const server = project.listen(PORT , () => {
            console.log(`Listening on port ${PORT}`)
        })

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})

