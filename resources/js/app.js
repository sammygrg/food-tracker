import axios from "axios"
import Noty from "noty"
import  { initAdmin }   from './admin'
import moment from "moment"



let addCart = document.querySelectorAll(".add-cart")
let priceCounter = document.querySelectorAll(".priceCounter")

function updateCart(foods){
    axios.post("/update-cart",foods).then(res =>{
        
        priceCounter.innerText = res.data.totalQty
        new Noty({
            type: "success",
            timeout:1000,
            text: "Item added"
        }).show();
    }).catch(err => {
        new Noty({
            type: "sucerrorcess",
            timeout:1000,
            text: "something went wrong"
        }).show();
        
    })
}

addCart.forEach((btn) => {
    btn.addEventListener("click",(effect) => {
         let foods = JSON.parse(btn.dataset.food)
         updateCart(foods)
    })
})

// remove alert message
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}



// order status
let statuses = document.querySelectorAll(".status_line")
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement("small")

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}



updateStatus(order);

//Socket

let socket = io()
initAdmin(socket); //passing parameter
//join 
if(order){
    socket.emit("join", `order_${order._id}`)
    
}

let adminAreaPath = window.location.pathname // verying admin page.
console.log(adminAreaPath)
if(adminAreaPath.includes("admin")){
    socket.emit("join", "adminRoom")
}

socket.on('orderUpdated', (data)=> { //listening the data from server
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: "success",
        timeout:1000,
        text: "Order has been updated"
    }).show();
    
})










 



