// calling in method passing parameter "/" and "req,res"
const authController = require("../app/http/controllers/authController")
const homeController = require ("../app/http/controllers/homeController")
const cartController = require ("../app/http/controllers/customers/cartController")
const orderController = require ("../app/http/controllers/customers/orderController")
const guest = require("../app/http/middlewares/guest")
const auth = require("../app/http/middlewares/auth")
const AdminOrderController = require ("../app/http/controllers/admin/orderController")

function allRoutes(project){
    
    project.get("/", homeController().index)
    
    
    
    project.get("/login", guest, authController().login)
    project.post("/login", authController().postLogin)
    
    project.get("/register", guest, authController().register)
    project.post("/register", authController().postRegister)
    project.post("/logout", authController().logout)


    project.get("/cart",cartController().index)
    project.post("/update-cart", cartController().update)

    //customer routes.
    project.post("/orders", auth, orderController().store )
    project.get("/customer/orders", auth,orderController().index )

    //Admin rotues 
    project.get("/admin/orders", auth, AdminOrderController().index)
    
}

module.exports = allRoutes