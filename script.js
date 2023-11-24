
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create';
let tmp;
//calculate and input the total

function gettotal(){
    if(price.value !=''){
        let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#092';
    }else{
        total.innerHTML='';
        total.style.background='#e491ad';
    }
}

//CREAT PRODUCT

// an array of products
let dataprod;
if(localStorage.product!=null){
    dataprod=JSON.parse(localStorage.product);
}else{
     dataprod=[];
}
//click at creat to creat new product 
submit.onclick= function(){
    
    let newprod={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    //IF button Creat
    if(title.value!=''){
    if(mood==='create'){ 
     //add the new product to the array
    //COUNT
     if(newprod.count>1){
        for (let i=0;i<newprod.count;i++){dataprod.push(newprod);}
     }else{ 
        dataprod.push(newprod);
     }
    
    
    //IF button Update

    }else{ 
        dataprod[tmp]=newprod;
        mood='create';
        submit.innerHTML='Create';
        count.style.display='block';
    }

    //add the data to the local storgae
    localStorage.setItem('product', JSON.stringify(dataprod));
    //clear the inputs
    cleardata();
    //show the data in the bottom
    showdata();
    }else{
        title.value='* Enter the title please *'
    }
}

//clear input

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
}

//show the products

function showdata(){
    gettotal();
    let table='';
    for(let i=0; i<dataprod.length; i++){
        table += '<tr>  <td>'+i+'</td> <td>'+dataprod[i].title+'</td> <td>'+dataprod[i].price+'</td> <td>'+dataprod[i].taxes+'</td> <td>'+dataprod[i].ads+'</td> <td>'+dataprod[i].discount+'</td> <td>'+dataprod[i].total+'</td> <td>'+dataprod[i].category+'</td> <td><button onclick="update('+i+')" id="btn_update">update</button></td>  <td><button onclick="deleteproduct('+i+')" id="btn_delete" >delete</button></td>  </tr>'
    }
    document.getElementById('tbody').innerHTML=table;
    //show the button 'deleteall'
    let deleteall_div=document.getElementById('deleteall');
    let deleteall_btn='<button onclick="deleteall()">Delete All ('+dataprod.length+')</button>';
    if(dataprod.length > 0){
       deleteall_div.innerHTML=deleteall_btn;
    }else{
        deleteall_div.innerHTML='';
    }
}
showdata();

//DELETE one product

function deleteproduct(i){
    dataprod.splice(i,1); //delete 1 item and that item id is 'i'
    localStorage.product=JSON.stringify(dataprod);//add the array to the local storage after deleting the item
    showdata();
}

//DELETE ALL

function deleteall(){
    localStorage.clear();//delete everything from local storage
    dataprod.splice(0);
    showdata();
}

//UPDATE

function update(i){
    title.value=dataprod[i].title;
    price.value=dataprod[i].price;
    taxes.value=dataprod[i].taxes;
    ads.value=dataprod[i].ads;
    discount.value=dataprod[i].discount;
    category.value=dataprod[i].category;
    gettotal();
    count.style.display='none';//remove the input of count
    submit.innerHTML='Update'
    mood='update'
    tmp=i;
    //when we click on button update the screen scroll up automtically
    scroll({
        top:0,  //0 means top
        behavior:'smooth'  //scroll up slowly
    })
}

//Search
let Searchmood='title';
let search_input=document.getElementById('search');
function getsearchmood(id){
    if(id=='btn-searchtit'){
        Searchmood="title";
        search_input.placeholder='Search By Title';
    }else{
        Searchmood="category";
        search_input.placeholder='Search By Category';
    }
    search_input.focus();
    search_input.value='';
    showdata();
}

function search_data(val){
    let table='';
    if(Searchmood=='title'){
        for(let i=0;i<dataprod.length;i++){
            if(dataprod[i].title.toLowerCase().includes(val)){
                    table += '<tr>  <td>'+i+'</td> <td>'+dataprod[i].title+'</td> <td>'+dataprod[i].price+'</td> <td>'+dataprod[i].taxes+'</td> <td>'+dataprod[i].ads+'</td> <td>'+dataprod[i].discount+'</td> <td>'+dataprod[i].total+'</td> <td>'+dataprod[i].category+'</td> <td><button onclick="update('+i+')" id="btn_update">update</button></td>  <td><button onclick="deleteproduct('+i+')" id="btn_delete" >delete</button></td>  </tr>'
            }
        }
    }else{
        for(let i=0;i<dataprod.length;i++){
            if(dataprod[i].category.toLowerCase().includes(val.toLowerCase())){
                    table += '<tr>  <td>'+i+'</td> <td>'+dataprod[i].title+'</td> <td>'+dataprod[i].price+'</td> <td>'+dataprod[i].taxes+'</td> <td>'+dataprod[i].ads+'</td> <td>'+dataprod[i].discount+'</td> <td>'+dataprod[i].total+'</td> <td>'+dataprod[i].category+'</td> <td><button onclick="update('+i+')" id="btn_update">update</button></td>  <td><button onclick="deleteproduct('+i+')" id="btn_delete" >delete</button></td>  </tr>'
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}