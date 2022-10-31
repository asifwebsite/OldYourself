
document.addEventListener("DOMContentLoaded", loadAdminScreen);

function loadAdminScreen() {
    fetch(("/displayAdminScreen"), {
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
                console.log(content.data);
                displayAdminScreen(content.data);
            }
        })
        .catch(failure);
}


function displayAdminScreen(users) {
    adminInsertToHtml = "";
    var adminHtml = document.getElementsByClassName('admin-Items')[0];
    for (let user in users) {
        let username = user;
        let userDetails = users[username];

        //Display cart items
        let cartItems = userDetails.cartItems
        let cartHtml = ""
        for (var i = 0; i < cartItems.length; i++) {
            cartHtml = cartHtml + cartItems[i].title + " ;<br>";
        }

        //Display purchases
        let purchasesItems = userDetails.purchases;
        let purchasesHtml = "";
        for (var i = 0; i < purchasesItems.length; i++) {

            purchasesHtml = purchasesHtml + purchasesItems[i].title + " ;<br>";
        }

        //Display login history
        let loginHistory = userDetails.loginHistory;
        let loginHistoryHtml = "";
        for (var i = 0; i < loginHistory.length; i++) {

            loginHistoryHtml = loginHistoryHtml + loginHistory[i] + "<br>";;
        }

        var userContent = `
                        <tr class="user-box" >
                        <td>${username}</td>
                        <td>${cartHtml}</td>
                        <td >${purchasesHtml}</td>
                        <td >${loginHistoryHtml}</td>
                        </tr>
    
            `
        adminInsertToHtml = adminInsertToHtml + userContent
    }

    adminHtml.innerHTML = adminInsertToHtml

}