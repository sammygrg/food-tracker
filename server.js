const express = require("express")
const project = express()
const ejs = require('ejs')
const path = require("path")
const eLayout = require("express-ejs-layouts") //express layout



const PORT = process.env.PORT || 8080

//Assets for web
project.use(express.static("public"))// defining where to get assets from.
project.get("/", function(req, res){ //request and response.
    res.render("home")
})

// setting template.
project.use(eLayout)
project.set("views", path.join(__dirname, "/resources/views"))
project.set("view engine", "ejs")

project.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
} )