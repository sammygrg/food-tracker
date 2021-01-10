const menu = require("../../models/menu")
const Menu = require("../../models/menu") // importhing menus for front end

function homeController(){ //setting req and res from web.js    
    return {
        async index (req, res){
            const foods = await Menu.find()
            return res.render("home", {foods: foods})
            
        }
    }
}

module.exports = homeController