var openShopping = document.querySelector('.shopping');
var list = document.querySelector('.list');
var cartItems = document.querySelector('.cartItems');
var body = document.querySelector('body');
var total = document.querySelector('.total');
var quantity = document.querySelector('.quantity');
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
    console.log('Shopping cart opened.');
});
// container of the main page
var products = [
    {
        id: 1,
        name: 'VIP',
        image: 'vip.jpg',
        price: 250,

    },
    {
        id: 2,
        name: 'BACKSTAGE',
        image: 'backstage.jpg',
        price: 200,

    },
    {
        id: 3,
        name: 'DANCE FLOOR',
        image: 'dancefloor.png',
        price: 150,

    },
    {
        id: 4,
        name: 'TENT',
        image: 'tent.jpg',
        price: 30,

    },
    {
        id: 5,
        name: 'CHAIR',
        image: 'chair.jpg',
        price: 10,

    },
    {
        id: 6,
        name: 'POUF CHAIR',
        image: 'poufchair.jpg',
        price: 20,

    },
]
//my list cart
var listCard = [];
function initApp(){
    products.forEach((value, key)=>{
        var imagePath =`../assets/${value.image}`;
        let newDiv = document.createElement('div');
        newDiv.classList.add('item')
        newDiv.innerHTML = `
        <img src="${imagePath}"/>
        <button class="like" onclick="toggleLike('products', this)"><span>❤</span></button>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}TND </div>
        <button class="button" onclick="addToCard(${key})"> Add To Card </button>
        `;
        list.appendChild(newDiv);
    });
    console.log('App initialized.');
}

initApp();
//adding product to the card
function addToCard(key){
    if(listCard[key]== null){
        listCard[key]= products[key];
        listCard[key].quantity = 1 ;
    }
    reloadCard();
    console.log('Item added to the cart.');
}
//reloading the card and calculating
function reloadCard() {
    cartItems.innerHTML = '';
    var count = 0;
    var totalPrice = 0;

    listCard.forEach((value, key) => {
        count += value.quantity;

        if (value != null) {
            totalPrice += value.price * value.quantity; // Calculate the total price using initial price
            var newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    <button class="delete" onclick="deleteItem(${key})"><i class="material-icons">delete</i></button>;
                </div>
            `;

            cartItems.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString()+ ' TND'; // the total price
    quantity.innerText = count;
    console.log('Shopping cart reloaded.');
}
//changing quantity
function changeQuantity(key, quantity) {
    if (quantity == 0){
        delete listCard[key];
   }else{
        listCard[key].quantity = quantity;
        
   }
   reloadCard();
   console.log('Quantity changed.');

}
//deleting items from the card
function deleteItem(key) {
    if (listCard[key] != null) {
        listCard.splice(key, 1);
        reloadCard();
    }
}
//liking a product in the main page
function toggleLike(productId, button) {
    var products = document.getElementById(productId);

    button.classList.toggle('liked');
    console.log('Like toggled.');
}