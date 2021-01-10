import axios from "axios"
import Noty from "noty"


let addCart = document.querySelectorAll(".add-cart")
let priceCounter = document.querySelectorAll(".priceCounter")

function updateCart(foods){
    axios.post("/update-cart",foods).then(res =>{
        console.log(res)
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
        console.log(effect)
         let foods = JSON.parse(btn.dataset.food)
         updateCart(foods)
    })
})


