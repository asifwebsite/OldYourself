"use strict";





function checkIfAdmin() {
    fetch(("/checkCookies"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    })
        .then(response => response.json())
        .then((content) => {
            if ('data' in content) {
                if(!content.data.admin) {
                    //Not admin - Page not found
                    window.location.replace("http://localhost:3000/404.html");
                }
                else{
                    return true;
                }
            }
        })
        .catch(failure);
    }

    // const resultsList = document.getElementById('results');
    // new URLSearchParams(window.location.search).forEach((value, name) => {
    //     if (name == "product-id") {
    //         id = value;
    //     }
    //     else if (name == "product-title") {
    //         title = value;
    //     }
    //     else if (name == "product-description") {
    //         description = value;
    //     }
    //     else if (name == "price") {
    //         price = "$" + value;
    //     }
    //     else if (name == "firstPhoto") {
    //         firstPhoto = value;
    //     } else if (name == "secPhoto") {
    //         secondPhoto = value;
    //     } else if (name == "thirdPhoto") {
    //         thirdPhoto = value;
    //     } else if (name == "fourPhoto") {
    //         fourPhoto = value;
    //     }
    //     else {
    //         category = value;
    //     }
        
    // })
        
 
function sendProductToAdd(product) {
    let url = "http://localhost:3000/addItemToShopDB";
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
                failure(content.error);
            }
            if ('data' in content) {
                
            }
        })
        .catch(failure);
}
 
function failure(err) {
    console.warn(err.code, err.message);
}
