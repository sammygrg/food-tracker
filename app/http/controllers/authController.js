function authController(){ //setting req and res from web.js    
    return {
        login(req,res){
            res.render("auth/login")
        },
        register(req, res){
            res.render("auth/register")
        }
    }
}

module.exports = authController