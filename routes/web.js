// calling in method passing parameter "/" and "req,res"
const authController = require("../app/http/controllers/authController")
const homeController = require ("../app/http/controllers/homeController")
const cartController = require ("../app/http/controllers/customers/cartController")
const orderController = require ("../app/http/controllers/customers/orderController")
const guest = require("../app/http/middlewares/guest")
const auth = require("../app/http/middlewares/auth")
const adminOrderController = require ("../app/http/controllers/admin/orderController")
const statusController = require ("../app/http/controllers/admin/statusController")

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
    project.get("/customer/orders/:id", auth,orderController().Show )

    //Admin rotues 
    project.get("/admin/orders", auth, adminOrderController().index)
    //admin/order/status
    project.post("/admin/order/status", auth, statusController().update)
}

module.exports = allRoutes