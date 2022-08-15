let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = 'Create';
let varToSTOREid;
// console.log(title,price,taxes,ads,discount,count,category,total,submit); //to make sure i have these ids

//Functions

// 1-get total price :

function getTotal() {
  if (price.value != "") {
    //put plus before each num because it is string at the moment(parse it to pe number)
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
//create product

let dataProduct = []; // i will store my data in this array to make it easier to retrieve or change the data

// in order to dont lose my old data from local storage when i reload my page

submit.onclick = () => {
  // submit is the create button so i need an event on click on thet button to collect the data in the array of obj
  let newProduct = {
    // an obj to store each new product in it to get back for the data easier
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // add products as many as in the count attribute[add more than one pro at the same time]

  // first we need to check thet the count is not empty 
//to solve create/update buttons issues 
if(mode === 'Create'){
  if(newProduct.count > 1){
    for(let i =0 ; i< newProduct.count;i++){
      dataProduct.push(newProduct); //create products as many as my count field
    }
   }
   else {
    dataProduct.push(newProduct); //just create one product
   }
  
} 
//if the button is updete
else {
  dataProduct[varToSTOREid]= newProduct;
  //after we update we want the button to be create again and to show the hidden count field 
 mode = 'Create';
 submit.innerHTML='Create'
 count.style.display= 'block';

}
   

  localStorage.setItem("product", JSON.stringify(dataProduct)); //parse it to str because local takes only strings as [kay,value]
  if (localStorage.product !== null) {
    dataProduct = JSON.parse(localStorage.getItem("product"));
  } else {
    dataProduct = [];
  }

  console.log(dataProduct);
  clearData();
  showData();
};

// clear data in the fields to write new inputs without reloading the package

function clearData() {
  // to delete the values from the text fields after click on create button
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}

function showData() {
  getData();
  // to get the data after click on create button

  // in order to get the data i alredy stored the data in dataProduct array
  //now i wanna loop thtough it and add the values inside it in the table var below
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    table += `  <tr>
<td> ${i+1}</td>
<td> ${dataProduct[i].title}</td>
<td> ${dataProduct[i].price}</td>
<td> ${dataProduct[i].taxes}</td>
<td>${dataProduct[i].ads}</td>
<td>1${dataProduct[i].discount}</td>
<td>${dataProduct[i].total}</td>
<td>${dataProduct[i].category}</td>
<td> <button onclick="updateProduct(${i})" id="update">update</button></td>
<td> <button onclick="deleteOneProduct(${i})" id="delete">delete</button></td> 
</tr>`;
    //call the delete function here with the event hendler on click
  }
  // now i wanna to call this function outside the function scope to keep showing the data
  //   console.log(table);
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll"); //to call the div of delete button
  if (dataProduct.length > 1) {
    // if i already have data in the array then show for me the delete all button
    btnDelete.innerHTML = `  <button onclick = "deleteAllProducts()"> delete All (${dataProduct.length}) </button>
    `; //added the array length to show how many product i have with the button
  } else {
    btnDelete.innerHTML = ""; // remove the button if i have to data in the array
  }
}

//delete one product

function deleteOneProduct(id) {
  // passing i as params which is the index of specific product to be deleted
  dataProduct.pop(id); // TO DELETE THE SPECIFIC PRODUCT
  localStorage.product = JSON.stringify(dataProduct); // to reflect the changes on the local storage also
  showData(); // to reflect the new data status without reload my page again
}

function deleteAllProducts() {
  localStorage.clear(); // to clear all the data from local localStorage
  dataProduct.splice(0); //cut/delete all values from 0 to last index
  showData(); // to reflect the changes on the page without reload
}


// update product by id
function updateProduct(id) {

  //in order to get the values in the table up to the fields to make changes on it
  title.value = dataProduct[id].title;
  price.value = dataProduct[id].price; 
  taxes.value = dataProduct[id].taxes;
  ads.value = dataProduct[id].ads;
  discount.value = dataProduct[id].discount;
  // we need to call the get total function to calculate the total 
  //we cant do it like the other fields because it needs to enter into the field to work and calculate

  getTotal();
   //now i need to hide the count field because i dont need it in the updating operation
   count.style.display = 'none';
  category.value = dataProduct[id].category;

  // now i want to change the create button into update text 
  submit.innerHTML ='Update';
  //now since it is already an create button so it will create a new product for me rather than updating it 
  // i will solve this by using if conditions
  mode = 'Update';
  varToSTOREid = id; //so we can use the index we want outside this function 

  //i want when i click update to automatically go to the fields to update the data
  scroll({
    top: 0,
    behavior: 'smooth'
  })
}