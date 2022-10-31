"use strict";

const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementsByClassName("admin-Items")[0];
    const userDetails = document.querySelectorAll(".user-box");
    const userName = storeitems.getElementsByTagName("td");

    for (var i = 0; i < userName.length; i++) {
        let match = userDetails[i].getElementsByTagName('td')[0];

        if (match) {
            let textValue = match.textContent || match.innerHTML;

            if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                userDetails[i].style.display = "";
            } else {
                userDetails[i].style.display = "none";
            }
        }
    }
}