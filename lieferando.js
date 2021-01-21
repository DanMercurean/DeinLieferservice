let food = [{
    'name': "Bob's BURGER",
    'info': 'mit doppeltem 180g Fleisch, Pommes frites, Salat, Jalapenos, Speck, Cheddar und Chilisauce.',
    'price': 10.50
}, {
    'name': 'BBQ - Platte',
    'info': 'mit Barbecuesauce, Bacon, Lollo-Rosso, Tomaten, roten Zwiebeln, Röstzwiebeln und Gewürzgurken Wahl aus: mit Bacon, mit Cheddar, mit Chicken-Patty, mit Gouda, mit Halloumi, mit Jalapenos und mehr.',
    'price': 15.30
}, {
    'name': 'Rumpsteak',
    'info': 'für Kenner, mit typischem Fettrand',
    'price': 14.90
}, {
    'name': 'XXXL Nachos (800g)',
    'info': 'mit 200g Cheddarsauce',
    'price': 12.90
}, {
    'name': 'Mozzarella-Sticks ',
    'info': 'mit Pommes frites und Salat',
    'price': 11.50
}, {
    'name': 'Pommes',
    'info': 'Beilagen Portion Pommes Frites',
    'price': 4.50
}];

let orderstatus = 0;
let shoppingCart = [];


/**
 * returns the sum of all items in the shopping cart
 */
function getShoppingCartSum() {
    let sum = 0;

    for (let index = 0; index < shoppingCart.length; index++) {
        const item = shoppingCart[index];
        sum += item.amount * item.price;
    }

    return sum;
}

function loadMenu() {
    for (i = 0; i < food.length; i++) {
        document.getElementById('foodcontainer').innerHTML += `
        <div class="dish">
        <div class="dish-structure">
        <div class="name">${food[i]['name']} </div>
        <div>${food[i]['info']} </div>
        <div class="price">${food[i]['price'].toFixed(2)}€</div>
        </div>
        <span onclick="foodAddToCart(${i})" class="material-icons"> add_box </span>
        </div>
        `;
    }
}


function foodAddToCart(i) {
    let item = {
        'name': food[i].name,
        'price': food[i].price,
        'amount': 1
    };
    let itemInShoppingCart = shoppingCart.find(function (e) { // check if item is already in shoppingcart
        return e.name == item.name;
    });
    if (itemInShoppingCart) {
        itemInShoppingCart.amount++; // amount of item increases
    }
    else {
        shoppingCart.push(item); // shoppingcart is filled with item
        console.log(shoppingCart);
    }
    updateShoppingCartHtml();
}

function updateShoppingCartHtml() {
    document.getElementById('items').innerHTML = '';

    for (i = 0; i < shoppingCart.length; i++) {

        let finalprice = shoppingCart[i]['price'] * shoppingCart[i]['amount'];
        document.getElementById('items').innerHTML += ` 
    <div class="bill-row">  
        <div class="bill-column">
            <div id="amount${i}" class="d-none">${shoppingCart[i]['amount']} x &nbsp; </div>    
            <div>${shoppingCart[i]['name']} </div>
        </div>
        <div class="bill-column">
        <div>${finalprice.toFixed(2)} </div>
        <div> &nbsp; <img onclick="deleteItem(${i})" class="icon3" src="img/delete.svg"</div>
        </div>
    </div>`;
        showAmount(i);
    }

    totalPriceCalc();
    checksum();
    showBasketBtn();
}

function deleteItem(i) {
    if (shoppingCart[i]['amount'] == 1) {
        shoppingCart.splice(i, 1);
    } else {
        shoppingCart[i].amount--;
    }
    updateShoppingCartHtml();
}

function showAmount(i) {
    if (shoppingCart[i]['amount'] > 1) {
        document.getElementById('amount' + i).classList.remove('d-none');
    }
}

function totalPriceCalc() {
    let sum = 0;
    let total = 0;

    for (i = 0; i < shoppingCart.length; i++) {
        sum += shoppingCart[i]['price'] * shoppingCart[i]['amount'];
        total = sum + 1.50;
    }

    document.getElementById('subtotal').innerHTML = `${sum.toFixed(2)}€`;
    document.getElementById('delivery').classList.remove('d-none');
    document.getElementById('delivery-costs').classList.remove('d-none');
    document.getElementById('total-price').innerHTML = `${total.toFixed(2)} €`;
}

function checksum() {
    let sum = getShoppingCartSum();
    if (sum >= 10.00) {
        orderstatus = 1;
        document.getElementById('sumcheck').innerHTML = '<br> Du hast den Mindestbestellwert von 10€ erreicht und kannst fortfahren.';
        document.getElementById('orderbutton').classList.add('basketButtonBlue');
    }
    else {
        orderstatus = 0;
        document.getElementById('sumcheck').innerHTML = '<br> Du hast den Mindestbestellwert von 10€ noch nicht erreicht.';
        document.getElementById('orderbutton').classList.remove('basketButtonBlue');
    }

}

function startorder() {
    checksum(); //Check if the required minimum amount to deliver is fulfilled
    let sum = getShoppingCartSum();

    if (orderstatus == 1) {
        document.getElementById('subtotal').innerHTML = `<p>Zwischensumme</p> <p>${sum.toFixed(2)}€</p>`;
        console.log('startorder processed.');
        alert('Bestellung wurde getätigt. Vielen Dank!');

        orderstatus == 0;
        checksum();
        updateShoppingCartHtml();
    }

    else {
        alert('Du hast den Mindestbestellwert noch nicht erreicht. Lege mehr Produkte in den Warenkorb, um bestellen zu können.');
    }
    shoppingCart = [];
    updateShoppingCartHtml();
}

function showBasketBtn() {
    document.getElementById("basket-btn").innerHTML += "";
    if (shoppingCart.length >= 1) {
        document.getElementById("basket-btn").classList.remove("d-none");
        document.getElementById("basket-btn").innerHTML += generateBtn();
    }
}

function generateBtn() {
    let total = getShoppingCartSum();
    return `
    <div class="basket-bottom-bar">
        <button class="basket-bottom-button btn btn-primary active" onclick="showBasketMobile()">
          <div class="basket-button-icon-container">
            <img class="basket-button-icon"src="img/shopping_cart-white-18dp.svg"/>
          </div>
          <p class="basket-button-label">
            <span class=""> Warenkorb</span>
            <span class="basket-button-label-price"> (${total.toFixed(2)} €) </span>
          </p>
        </button>
    </div>`;
}

function showBasketMobile() {
    document.getElementById("shopping-basket").classList.remove("hide-mobile");
    checksum();
}

function closeBasket() {
    let total = getShoppingCartSum();
    document.getElementById("shopping-basket").classList.add("hide-mobile");
    document.getElementById("basket-btn").innerHTML += `(${total.toFixed(2)} €)`;
    document.getElementById("basket-btn").innerHTML += "";
}

function filterNames() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    document.getElementById('foodcontainer').innerHTML = '';
    console.log('Search is', search);
    for (i = 0; i < food.length; i++) {
        let name = food[i]['name'];

        if(name.toLowerCase().includes(search)) {
            document.getElementById('foodcontainer').innerHTML += generateFoodItemHTML(i);
        }   
    }
}

 function generateFoodItemHTML() {
    return`
       <div class="dish">
         <div class="dish-structure">
      <div class="name">${food[i]['name']} </div>
         <div>${food[i]['info']} </div>
         <div class="price">${food[i]['price'].toFixed(2)}€</div>
         </div>
     <span onclick="foodAddToCart(${i})" class="material-icons"> add_box </span>
     </div>
         `;
    }
