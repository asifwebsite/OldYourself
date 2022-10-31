//Load products from DB
document.addEventListener("DOMContentLoaded", loadProducts);
let isAdmin = false;

function loadProducts() {
    fetch(("/loadProducts"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    })
        .then(response => response.json())
        .then((content) => {
            if ('error' in content) {
                failure(content.error);
            }
            if ('data' in content) {
                let products = content.data;
                showProducts(products);
            }
        })
        .catch(failure);
}

function showProducts(products) {
    var shopHtml = document.getElementsByClassName("product-list")[0];
    var productsInsertToHtml = "";
    for (const productId in products) {
        if (productId) {
            const product = products[productId];
            var productContent = `
        <div class="product" id=${productId}>
        <div class="productRemove">
        <span class="product-remove">&#10005;<span>
        </div>
                <div onclick=${product.onclick}>
                    <img src=${product.src} class="product-img">
                    <div class="des">
                        <span>${product.category}</span>
                        <h5 class="product-title">${product.title}</h5>
                        <h4 class="price">${product.price}</h4>
                    </div>
                </div>
                <div class="cartCircle">
                <i class="fal fa-shopping-cart cart" id="cart-icon"></i>
                </div>
        </div>

        `
            productsInsertToHtml = productsInsertToHtml + productContent
        }
    }
    shopHtml.innerHTML = productsInsertToHtml

    let cartIcon = document.querySelector('#cart-icon');
    var addCart = document.getElementsByClassName("cartCircle");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    checkIfAdmin();

}

function checkIfAdmin() {
    fetch(("/checkAdminShop"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    })
        .then(response => response.json())
        .then((content) => {
            if ('data' in content) {
                isAdmin = content.data.admin
                showAdminFeatures(isAdmin);
            }
        }).catch(failure);
}

//add to cart function
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    let product = {
        "title": title,
        "price": price,
        "productImg": productImg,
    }

    let endpoint = 'addToCart'
    sendData(product, endpoint, showLoaderShop);

}

//Admin Section
function showAdminFeatures(isAdmin) {
    var removeProducts = document.getElementsByClassName("product-remove");
    var addProducts = document.getElementById("add-Product");
    if (isAdmin) {
        addProducts.style.display = 'flex'
        for (var i = 0; i < removeProducts.length; i++) {
            removeProducts[i].style.display = 'block';
            var button = removeProducts[i];
            button.addEventListener("click", adminRemoveProduct);
        }
    }
    else {
        addProducts.style.display = 'none'
        for (var i = 0; i < removeProducts.length; i++) {
            removeProducts[i].style.display = 'none';
        }
    }
}

//Remove Products by Admin

function adminRemoveProduct(event) {
    var buttonClicked = event.target;
    var removedItemId = buttonClicked.parentNode.parentNode.id;
    var product = {
        id: removedItemId
    };
    let endpoint = "removeItemFromShopDB";
    sendData(product, endpoint, loadProducts);
}

function showAddProductsWindow() {
    if (isAdmin) {
        var addProductWindow = document.getElementById("add-Product-Window");
        var addProducts = document.getElementById("add-Product");
        addProducts.style.display = "none";
        addProductWindow.style.display = 'block'
    } else {
        window.location.replace("http://localhost:3000/login.html");
    }

}

const adminAddProduct = () => {
    // loader.style.display = 'block';
    const id = document.querySelector('#product-id').value;
    const title = document.querySelector('#product-title').value;
    const description = document.querySelector('#des').value;
    const price = "$" + document.querySelector('#price').value;
    const firstPhoto = document.querySelector('#first-file-upload-btn').value;
    const secondPhoto = document.querySelector('#second-file-upload-btn').value;
    const thirdPhoto = document.querySelector('#third-file-upload-btn').value;
    const fourthPhoto = document.querySelector('#fourth-file-upload-btn').value;
    const category = document.querySelector('input[name="category"]:checked').value;

    if (id.length < 1) {
        showAlertShop("Please add product id");
    }else if(title.length < 1){
        showAlertShop("Please add product title");
    }else if(description.length < 1){
        showAlertShop("Please add product description");
    }else if(price.length < 2 ){
        showAlertShop("Please insert a valid price");
    }else{
        const productObj = {}
    productObj[id] = {
        onclick: "#",
        src: `${firstPhoto}`,
        category: `${category}`,
        title: `${title}`,
        price: `${price}`
    }

    productObj["id"] = id;
    let endpoint = 'addItemToShopDB'

    setTimeout(() => {
        var addProductWindow = document.getElementById("add-Product-Window");
        var addProducts = document.getElementById("add-Product");
        addProducts.style.display = "flex";
        addProductWindow.style.display = 'none'
    }, 3000)
    sendData(productObj, endpoint, loadProducts);
    }    
}

function sendData(product, endpoint, callback) {
    let url = `http://localhost:3000/${endpoint}`;
    let h = new Headers();
    h.append('content-Type', 'application/json');
    let req = new Request(url, {
        method: 'POST',
        headers: h,
        body: JSON.stringify(product),
    });
    fetch(req)
        .then((res) => res.json())
        .then((content) => {
            if ('error' in content) {
                showAlertShop(content.error.message);
                failure(content.error);
            }
            if ('data' in content) {
                callback(content.data);
                showAlertAdd(content.data)
            }
        })
        .catch(failure);
}

function failure(err) {
    console.warn(err.code, err.message);
}

//Alert
const showAlertShop = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    loader.style.display = 'none';
    alertMsg.innerHTML = msg;

    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000)
}

//Alert-add
const showAlertAdd = (msg) => {
    let alertBox = document.querySelector('.alert-box-add');
    let alertMsg = document.querySelector('.alert-msg-add');
    alertMsg.innerHTML = msg;
    loader.style.display = 'none';

    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000)
}

async function showLoaderShop(msg) {
    let loader = document.querySelector('.loader');
    loader.style.display = 'block'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000)
    showAlertAdd(msg);
}