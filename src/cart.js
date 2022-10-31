//cart working JS
const cart = document.querySelector('#cart');


if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", getCartListFromDB);
}
else {
    getCartListFromDB();
}



//Making function
async function getCartListFromDB() {
    fetch(("/cartList"), {
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
            else if ('data' in content) {
                showCart(content.data);
            }
        })
        .catch(failure);
}


async function showCart(cartList) {
    cartInsertToHtml = "";
    var cartHtml = document.getElementsByClassName('cart-Items')[0];
    for (var i = 0; i < cartList.length; i++) {
        var curItem = cartList[i];
        var cartBoxContent = `
                    <tr class="cart-box">
                    <td><a href="#"><img class="cart-remove" src="../X.png"></a></td>
                    <td><img src=${curItem.productImg} alt=""></td>
                    <td class='cart-product-title'>${curItem.title}</td>
                    <td class="cart-price">${curItem.price}</td>
                    </tr>

        `
        cartInsertToHtml = cartInsertToHtml + cartBoxContent
    }

    cartHtml.innerHTML = cartInsertToHtml
    updatetotal();

    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    // console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
}

//Remove items from cart
async function removeCartItem(event) {
    var buttonClicked = event.target
    var removedItamTitle = buttonClicked.parentNode.parentNode.parentNode.getElementsByClassName('cart-product-title')[0].innerText;
    let product = {
        title: removedItamTitle,
    }
    let endpoint = "removeItemFromCartDB"
    sendData(product, endpoint, getCartListFromDB)

    buttonClicked.parentNode.parentNode.parentNode.remove();
    updatetotal();
}

//update total
function updatetotal() {
    var cartContent = document.getElementById('cart');
    console.log(cartContent)
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    console.log(cartBoxes)
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        console.log("price", priceElement)
        var price = parseFloat(priceElement.innerText.replace("$", "").replace(",", ""));
        console.log(price)
        total = total + price;
    }
    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total;
    document.getElementsByClassName('total-price')[1].innerHTML = '$' + total;

}


async function checkOut() {
    await showLoader();
    fetch(("/checkOut"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    })
        .then(response => response.json())
        .then((content) => {
            if ('data' in content) {

                getCartListFromDB();
            } else if ('error' in content) {
                showAlertCart(content.error.message);
            }
        })
        .catch(failure);
}


async function sendData(product, endpoint, callback) {
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
                showAlertCart(content.error.message);
                failure(content.error);
            }
            if ('data' in content) {
                callback(content.data);
            }
        })
        .catch(failure);
}

function failure(err) {
    console.warn(err.code, err.message);
}

//Alert
const showAlertCart = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');

    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000)
}

//loader
async function showLoader() {
    let loader = document.querySelector('.loader');
    loader.style.display = 'block'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000)

}

