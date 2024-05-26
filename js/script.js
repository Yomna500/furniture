
let products=[
   {
    id:1,
    title:"Sofa",
    desc:"Different colored sofa",
    price:50000,
    category:"Sofa",
    imgUrl:"img/IMG-20240526-WA0051.jpg",
    quantity:1,
   },
   {
    id:2,
    title:"Sofa",
    desc:"White sofa",
    price:45000,
    category:"Sofa",
    imgUrl:"img/IMG-20240526-WA0052.jpg",
    quantity:1,
   }, 
    {
    id:3,
    title:"Sofa",
    desc:"brown sofa",
    price:30000,
    category:"Sofa",
    imgUrl:"img/IMG-20240526-WA0053.jpg",
    quantity:1,
   },  
   {
    id:4,
    title:"Sofa",
    desc:"corner green sofa",
    price:50000,
    category:"Sofa",
    imgUrl:"img/IMG-20240526-WA0054.jpg",
    quantity:1,
   },
   {
    id:5,
    title:"Bed",
    desc:"comfortable bed",
    price:10000,
    category:"Bed",
    imgUrl:"img/IMG-20240526-WA0055.jpg",
    quantity:1,
   },
   {
    id:6,
    title:"Vanity table",
    desc:"Brown vanity",
    price:30000,
    category:"Vanity table",
    imgUrl:"img/IMG-20240526-WA0056.jpg",
    quantity:1,
   },
   {
    id:7,
    title:"Bed",
    desc:"Regular bed",
    price:7000,
    category:"Bed",
    imgUrl:"img/IMG-20240526-WA0057.jpg",
    quantity:1,
   },
   {
    id:8,
    title:"Chair",
    desc:"Rose chair",
    price:15000,
    category:"Chair",
    imgUrl:"img/IMG-20240526-WA0058.jpg",
    quantity:1,
   },   {
    id:9,
    title:"Chair",
    desc:"Table chair",
    price:5000,
    category:"Chair",
    imgUrl:"img/IMG-20240526-WA0059.jpg",
    quantity:1,
   },
   {
    id:10,
    title:"Chair",
    desc:"Chair",
    price:14000,
    category:"Chair",
    imgUrl:"img/IMG-20240526-WA0060.jpg",
    quantity:1,
   },
   {
    id:11,
    title:"Chair",
    desc:"White chair",
    price:20000,
    category:"Chair",
    imgUrl:"img/IMG-20240526-WA0061.jpg",
    quantity:1,
   },
   {
    id:12,
    title:"table",
    desc:"Table",
    price:60000,
    category:"table",
    imgUrl:"img/IMG-20240526-WA0062.jpg",
    quantity:1,
   },
   {
    id:13,
    title:"Table",
    desc:"Table",
    price:2000,
    category:"table",
    imgUrl:"img/IMG-20240526-WA0063.jpg",
    quantity:1,
   },
   {
    id:14,
    title:"Vanity",
    desc:"Vanity",
    price:800,
    category:"Vanity table",
    imgUrl:"img/IMG-20240526-WA0064.jpg",
    quantity:1,
   },
   {
    id:15,
    title:"Table",
    desc:"White Shose with laces",
    price:6500,
    category:"table",
    imgUrl:"img/IMG-20240526-WA0065.jpg",
    quantity:1,
   },
   {
    id:16,
    title:"Chair",
    desc:"Chair",
    price:10000,
    category:"Chair",
    imgUrl:"img/IMG-20240526-WA0066.jpg",
    quantity:1,
   }
   
]


let allproducts = document.querySelector(".products");
let inputValue = document.querySelector("#exampleFormControlInput1");
let searchType = document.querySelector("#ddlViewBy").value;
let incart = document.querySelector(".incart");
let cartp = document.querySelector(".carts-products");
let quantity = document.querySelector(".quantity");

let addItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
let addFav = localStorage.getItem("ProductsFav") ? JSON.parse(localStorage.getItem("ProductsFav")) : [];

const displayItem = (items) => {
    allproducts.innerHTML = items.map((item) => {
        let { imgUrl, title, price, desc, category, id } = item;
        return `
        <div class="container text-center" id="container">
            <div class="product card" style="width: 18rem;" id="product-${id}">
                <img src="${imgUrl}"  class="card-img-top product-img" alt="${title}">
                <h4>${title}</h4>
                <p class="card-text">${desc}</p>
                <p class="card-text">${category}</p>
                <p style="font-weight: bold; font-size: 18px;">${price}EGP</p>

                <i class="btn-i fas fa-heart"  
                style="color: ${addFav.some(item => item.id === id) ? "red" : "black"};"
                data-id="${id}"
                onclick="AddFav(${id})"></i>

                <div class="btn-con">
                <button class="btn btn-color" style="width: 130px; 
                background-color: ${addItem.some(item => item.id === id) ? "white" : "#6F4E37"};
                color: ${addItem.some(item => item.id === id) ? "#6F4E37" : "white"};
                border: 1px solid #6F4E37; "
                 data-id="${id}"
                 onclick="addCart(${id})">
                    ${addItem.some(item => item.id === id) ? "Remove" : "Add to Cart"}
                </button>
                </div>
            </div>
        </div>
            
            `;
    }).join('');
}

const filterProducts = () => {
    const value = inputValue.value.toLowerCase();
    let filteredProducts;
    if (searchType === "1") {
        filteredProducts = products.filter((item) => item.title.toLowerCase().includes(value));
    } else {
        filteredProducts = products.filter((item) => item.category.toLowerCase().includes(value));
    }
    displayItem(filteredProducts);
}

document.querySelector("#ddlViewBy").addEventListener("change", (e) => {
    searchType = e.target.value;
    filterProducts();
});

inputValue.addEventListener("input", filterProducts);

const displayCartItems = () => {
    incart.innerHTML = '';
    addItem.forEach(item => {
        incart.innerHTML += `
            <div class="cart-container" id="cart-item-${item.id}">
                <p>${item.title}</p>
                <div class="product-num">
                    <button class="decrease" onclick="onDecrease(${item.id})">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button class="increase" onclick="onIncrease(${item.id})">+</button>
                </div>
            </div>
        `;
    });
    quantity.style.display = addItem.length > 0 ? "block" : "none";
    quantity.innerHTML = addItem.length;
    updateCartButtons();
}

const updateLocalStorage = () => {
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
}

const addCart = (id) => {
    if (localStorage.getItem("username")) {
        let choosed = products.find(item => item.id == id);
        let existingItem = addItem.find(item => item.id == choosed.id);
        
        if (existingItem) {
            removeCart(id);
        } else {
            choosed.quantity = 1;
            addItem.push(choosed);
            updateLocalStorage();
            displayCartItems();
            renderProducts(); 
        }
    } else {
        window.location = "login.html";
    }
}

const removeCart = (id) => {
    addItem = addItem.filter(item => item.id !== id);
    updateLocalStorage();
    displayCartItems();
    renderProducts(); 
}

const onDecrease = (id) => {
    let item = addItem.find(item => item.id == id);
    if (item) {
        item.quantity--;
        if (item.quantity == 0) {
            removeCart(id);
        } else {
            updateLocalStorage();
            document.getElementById(`quantity-${id}`).textContent = item.quantity;
        }
    }
}

const onIncrease = (id) => {
    let item = addItem.find(item => item.id == id);
    if (item) {
        item.quantity++;
        updateLocalStorage();
        document.getElementById(`quantity-${id}`).textContent = item.quantity;
    }
}

const updateCartButtons = () => {
    products.forEach(product => {
        const button = document.querySelector(`.btn-color[data-id="${product.id}"]`);
        if (button) {
            const isInCart = addItem.some(item => item.id === product.id);
            button.textContent = isInCart ? "Remove" : "Add to Cart";
            button.style.backgroundColor = isInCart ? "white" : "#6F4E37";
        }
    });
}

document.querySelector(".cartin i").addEventListener("click", () => {
    cartp.style.display = (cartp.style.display == "block") ? "none" : "block";
});


displayCartItems();

const renderProducts = () => {
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = products.map(product => `
    <div class="container text-center" id="container">
        <div class="product card" style="width: 18rem; " id="product-${product.id}">
            <img src="${product.imgUrl}"  class="card-img-top product-img" alt="${product.title}">
            <h4>${product.title}</h4>
            <p class="card-text">${product.desc}</p>
            <p class="card-text">${product.category}</p>
            <p style="font-weight: bold; font-size: 18px;">${product.price}EGP</p>

            <i class="btn-i fas fa-heart"  
            style="color: ${addFav.some(item => item.id === product.id) ? "red" : "black"};"
            data-id="${product.id}"
            onclick="AddFav(${product.id})"></i>

            <div class="btn-con">
            <button class="btn btn-color" style="width: 130px; 
            background-color: ${addItem.some(item => item.id === product.id) ? "white" : "#6F4E37"};
            color: ${addItem.some(item => item.id === product.id) ? "#6F4E37" : "white"};
            border: 1px solid #6F4E37; "
             data-id="${product.id}"
             onclick="addCart(${product.id})">
                ${addItem.some(item => item.id === product.id) ? "Remove" : "Add to Cart"}
            </button>
            </div>
        </div>
    </div>
    `).join('');
}


renderProducts();

const AddFav = (id) => {
    if (localStorage.getItem("username")) {
        let choosed = products.find(item => item.id == id);
        let existingItem = addFav.find(item => item.id == choosed.id);
        
        if (existingItem) {
            removeFav(id);
        } else {
            addFav.push(choosed);
            updateLocalStoragef();
            renderProducts(); 
        }
    } else {
        window.location = "login.html";
    }
}

const updateLocalStoragef = () => {
    localStorage.setItem("ProductsFav", JSON.stringify(addFav));
}
const removeFav = (id) => {
    addFav = addFav.filter(item => item.id !== id);
    updateLocalStoragef();
    renderProducts(); 
}