let ProductsInCart = localStorage.getItem("ProductsInCart");
let allProducts = document.querySelector(".table-place");
let priceElement = document.querySelector(".price");

let addItem = ProductsInCart ? JSON.parse(ProductsInCart) : [];

if (addItem.length) {
    displayCartItems(addItem);
}

function displayCartItems(products) {
    let productHTML = products.map(item => {
        return `
        <tr>
            <td><img src="${item.imgUrl}" alt="${item.title}" class="table-img"></td>
            <td>
                <h3 class="table-title">${item.title}</h3>
                <p class="table-desc">${item.category}</p>
            </td>
            <td><p class="table-price">${item.price}</p></td>
            <td>
                <div class="product-num table-product">
                    <button class="decrease" onclick="onDecrease(${item.id})">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button class="increase" onclick="onIncrease(${item.id})">+</button>
                </div>
            </td>
            <td><p id="subtotal-${item.id}" class="table-subtotal">${item.price * item.quantity}</p></td>
            <td><p><i class="fas fa-trash table-trash" onClick="removeCart(${item.id})"></i></p></td>
        </tr>
        `;
    }).join('');
    allProducts.innerHTML = productHTML;
    calculateTotalPrice(products);
}

function calculateTotalPrice(products) {
    let totalPrice = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    priceElement.innerHTML = `Total Price: ${totalPrice} EGP`;
}

const updateLocalStorage = () => {
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
}

const removeCart = (id) => {
    addItem = addItem.filter(item => item.id !== id);
    updateLocalStorage();
    displayCartItems(addItem);
}

const onDecrease = (id) => {
    let item = addItem.find(item => item.id == id);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            removeCart(id);
        } else {
            updateLocalStorage();
            document.getElementById(`quantity-${id}`).textContent = item.quantity;
            document.getElementById(`subtotal-${id}`).textContent = item.price * item.quantity;
        }
        calculateTotalPrice(addItem);
    }
}

const onIncrease = (id) => {
    let item = addItem.find(item => item.id == id);
    if (item) {
        item.quantity++;
        updateLocalStorage();
        document.getElementById(`quantity-${id}`).textContent = item.quantity;
        document.getElementById(`subtotal-${id}`).textContent = item.price * item.quantity;
        calculateTotalPrice(addItem);
    }
}

if (addItem.length) {
    calculateTotalPrice(addItem);
}

let ProductsFav = localStorage.getItem("ProductsFav");
let fav = document.querySelector(".table-pl");

let addFav = ProductsFav ? JSON.parse(ProductsFav) : [];

if (addFav.length) {
    displayFav(addFav);
}

function displayFav(products) {
    let productHTML = products.map(item => {
        return `
        <tr>
            <td><img src="${item.imgUrl}" alt="${item.title}" class="table-img"></td>
            <td>
                <h3 class="table-title">${item.title}</h3>
                <p class="table-desc">${item.category}</p>
            </td>
            <td><p class="table-price">${item.price}</p></td>
            <td><p><i class="fas fa-heart table-trash" style="color:red" onClick="removeFav(${item.id})"></i></p></td>
        </tr>
        `;
    }).join('');
    fav.innerHTML = productHTML;
}

const updateLocalStoragef = () => {
    localStorage.setItem("ProductsFav", JSON.stringify(addFav));
}

const removeFav = (id) => {
    addFav = addFav.filter(item => item.id !== id);
    updateLocalStoragef();
    displayFav(addFav);
}
