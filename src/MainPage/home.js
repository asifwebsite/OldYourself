"use strict";
const btnShop = document.getElementById('btnShop');
btnShop.onclick = function () {
    window.location.href = "../ShopPage/shop.html";
}

document.addEventListener("DOMContentLoaded", loadNewProducts);

function loadNewProducts() {
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
                let newProducts = {};
                let keys = Object.keys(products);
                for(var i =0; i<8;i++){
                    let curKey = keys[i];
                    let curProduct = products[curKey];
                    newProducts[curKey] = curProduct
                }
                showNewProducts(newProducts);
            }
        })
        .catch(failure);
    }

function showNewProducts(products){
    var homeNewProductsHtml = document.getElementsByClassName("product-list")[0];
    var productsInsertToHtml = "";
    for(const productId in products){
        const product = products[productId];
        const newSrc = "../ShopPage/".concat(product.src)
        var productContent = `
        <div class="product" id=${productId}>
                    <img src=${newSrc} class="product-img">
                    <div class="des">
                        <span>${product.category}</span>
                        <h5 class="product-title">${product.title}</h5>
                        <h4 class="price">${product.price}</h4>
                    </div>
        </div>

        `
        productsInsertToHtml = productsInsertToHtml + productContent    
    }
    homeNewProductsHtml.innerHTML = productsInsertToHtml
}