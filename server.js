require("dotenv").config()
const express = require("express")
const project = express()
const ejs = require('ejs')
const path = require("path")
const PORT = process.env.PORT || 8080
const eLayout = require("express-ejs-layouts") //express layout
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const DatabaseStore = require("connect-mongo")(session)
const passport = require("passport")



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



//session store.
let mgStore = new DatabaseStore({
    mongooseConnection: conneciton,
    collection: "session"
})

//session config  IMPORTANT FOR COOKIES 
project.use(session({
    secret: process.env.SECRET_DATA,
    resave : false,
        store: mgStore,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24} //cookies age 24hrs
     
    
}))

//passport config
const passportInit = require("./app/config/passport")
passportInit(passport)
project.use(passport.initialize())
project.use(passport.session())


project.use(flash())

//Assets for web
project.use(express.static("public"))// defining where to get assets from.
project.use(express.urlencoded({ extended : false})) // so that it can real url encoded data.
project.use(express.json())

//Global middleware
project.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()

})

// setting template.
project.use(eLayout)
project.set("views", path.join(__dirname, "/resources/views"))
project.set("view engine", "ejs")

require("./routes/web.js")(project)








project.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
} )