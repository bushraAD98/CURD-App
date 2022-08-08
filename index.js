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

var dataProduct ; // i will store my data in this array to make it easier to retrieve or change the data

// in order to dont lose my old data from local storage when i reload my page
if(localStorage.dataProduct !== null){
   dataProduct = JSON.parse(localStorage.product);
}
else {
   dataProduct = []; 
}

submit.onclick = function(){ // submit is the create button so i need an event on click on thet button to collect the data in the array of obj
let newProduct = { // an obj to store each new product in it to get back for the data easier 
   title : title.value, // [key:value] pairs represents the product actual data values
   price : price.value ,
   taxes : taxes.value,
   ads : ads.value,
   discount : discount.value,
   total : total.innerHTML ,// because it is an small tag not an input tag 
   count : count.value ,
   category : category.value
}
dataProduct.push(newProduct)
localStorage.setItem('product', JSON.stringify(dataProduct)) //parse it to str because local takes only strings as [kay,value]
// console.log(dataProduct);
clearData();
showData();
}

// clear data in the fields to write new inputs without reloading the package

function clearData() {
   // to delete the values from the text fields after click on create button 
   title.value = '',
   price.value = '' ,
   taxes.value = '',
   ads.value = '',
   discount.value = '',
   total.innerHTML = '',
   count.value = '' ,
   category.value = ''
}

function showData(){
// to get the data after click on create button
  
// in order to get the data i alredy stored the data in dataProduct array 
//now i wanna loop thtough it and add the values inside it in the table var below
   let table ='' ;
 
   for(let i = 0; i< dataProduct.length ; i++){
table += `  <tr>
<td> ${i}</td>
<td> ${dataProduct[i].title}</td>
<td> ${dataProduct[i].price}</td>
<td> ${dataProduct[i].taxes}</td>
<td>${dataProduct[i].ads}</td>
<td>1${dataProduct[i].discount}</td>
<td>${dataProduct[i].total}</td>
<td>${dataProduct[i].category}</td>
<td> <button id="update">update</button></td>
<td> <button id="delete">delete</button></td>
</tr>`;
   }
   // now i wanna to call this function outside the function scope to keep showing the data
   console.log(table);
 document.getElementById('tbody').innerHTML = table;

   
}