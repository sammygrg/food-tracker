const Order = require("../../../models/order")
const moment = require("moment")

function orderController (){
    return{
        store(req, res){
           
            // validating request
            const{phone,address}= req.body
            if(!phone || !address){

                req.flash("error, please fill in required fields")
                return res.redirect("/cart")
            }

            const order =  new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            order.save().then(result => {
                req.flash("sucess", "your order has been placed")
                delete req.session.cart
                return res.redirect('/customer/orders')
                
            }).catch(err => {
                req.flash("error","something went wrong")
                return res.redirect("/cart")
            })
        },
        async index(req, res){
            const orders = await Order.find({customerId: req.user._id}, null,{sort:{"createdAt": -1}}) // orders sorted by newest
            res.render("customers/orders", {orders: orders, moment: moment})
          
        }
    }
}

module.exports = orderController