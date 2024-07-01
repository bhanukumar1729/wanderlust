let taxToggle=document.getElementById("flexSwitchCheckReverse");
let price=document.querySelectorAll(".price")
let price2=document.querySelectorAll(".price2")
let lable=document.querySelectorAll(".tax-toggle-lable")
taxToggle.addEventListener('click',()=>{
    for(single of price){
        single.classList.toggle("disappear")
    }
    for(single of price2){
        single.classList.toggle("disappear")
    }
    lable.style.color="Black"
})
