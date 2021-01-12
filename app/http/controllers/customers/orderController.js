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
                // emit
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced',result ) // now server can use it 
                return res.redirect('/customer/orders')
                
            }).catch(err => {
                req.flash("error","something went wrong")
                return res.redirect("/cart")
            })
        },
        async index(req, res){
            const orders = await Order.find({customerId: req.user._id}, null,{sort:{"createdAt": -1}}) // orders sorted by newest
            res.render("customers/orders", {orders: orders, moment: moment})
          
        },
        async Show(req, res){
            const order = await Order.findById(req.params.id)
            // authorise users.

            if(req.user._id.toString() === order.customerId.toString()){
                res.render("customers/singleOrder", { order:order})
            } else {
                res.redirect("/")
            }

        }
    }
}

module.exports = orderController