// calling in method passing parameter "/" and "req,res"
const authController = require("../app/http/controllers/authController")
const homeController = require ("../app/http/controllers/homeController")
const cartController = require ("../app/http/controllers/customers/cartController")
const guest = require("../app/http/middlewares/guest")


function allRoutes(project){
    
    project.get("/", homeController().index)
    
    
    
    project.get("/login", guest, authController().login)
    project.post("/login", authController().postLogin)
    
    project.get("/register", guest, authController().register)
    project.post("/register", authController().postRegister)
    project.post("/logout", authController().logout)


    project.get("/cart",cartController().index)
    project.post("/update-cart", cartController().update)
}

module.exports = allRoutes