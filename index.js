let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// console.log(title,price,taxes,ads,discount,count,category,total,submit); //to make sure i have these ids

//Functions 

// 1-get total price :

function getTotal()
{
 if(price.value != ''){ //put plus before each num because it is string at the moment(parse it to pe number)
    let result = ( +price.value + +ads.value + +taxes.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
 }
 else{
    total.innerHTML = '';
    total.style.background = '#a00d02';

 }
}
//create product

let dataProduct ; //to store the price values in it
// now i need to store each product data in one object
if(localStorage.product !== null){
   dataProduct = Json.parse(localStorage.product); 
}
else {
   dataProduct = []; 
}

submit.onclick = function(){
let newProduct = {
   title : title.value,
   price : price.value ,
   taxes : taxes.value,
   ads : ads.value,
   discount : discount.value,
   total : total.innerHTML ,// because it is an small tag not an input
   count : count.value ,
   category : category.value
}
dataProduct.push(newProduct)
localStorage.setItem('product', JSON.stringify(dataProduct)) //parse it to str because local takes only strings as [kay,value]
console.log(dataProduct);
}

// clear data in the fields to write new inputs without reloading the package

function clearData() {
   
}