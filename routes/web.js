// calling in method passing parameter "/" and "req,res"
const authController = require("../app/http/controllers/authController")
const homeController = require ("../app/http/controllers/homeController")
const cartController = require ("../app/http/controllers/customers/cartController")


function allRoutes(project){
    
    project.get("/", homeController().index)
    
    
    
    project.get("/login", authController().login)
    
    project.get("/register", authController().register)


    project.get("/cart",cartController().index)
    project.post("/update-cart", cartController().update)
}

module.exports = allRoutes