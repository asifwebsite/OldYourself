const loader = document.querySelector('.loader');

//Login and Signup system
const signupBtn = document.querySelector('#signup-btn');
const loginBtn = document.querySelector('#login-btn');
const loginNavBtn = document.querySelector('#loginBtn');
const logoutNavBtn = document.querySelector('#logoutBtn')
const loginNavBtnMobile = document.querySelector('#loginBtnMobile');
const logoutNavBtnMobile = document.querySelector('#logoutBtnMobile')

// const loginBtn = document.getElementById('loginBtn');
// const logoutBtn = document.getElementById('logoutBtn');
let curPath = "";

document.addEventListener("DOMContentLoaded", checkIfHasCookies);


const doSignup = () => {
    // select inputs signup
    const usernameSignup = document.querySelector('#usernameSignup');
    const email = document.querySelector('#email');
    const passwordSignup = document.querySelector('#passwordSignup');
    const number = document.querySelector('#number');
    const tac = document.querySelector('#terms-and-cond');
    const notification = document.querySelector('#notification');
    if (usernameSignup.value.length < 3) {
        showAlert('name must be at least 3 letters long');
    } else if (!email.value.length) {
        showAlert('enter your email');
    } else if (passwordSignup.value.length < 8) {
        showAlert('password should be 8 letters long');
    } else if (!number.value.length) {
        showAlert('enter a valid phone number');
    } else if (!Number(number.value) || number.value.length < 10) {
        showAlert('enter a valid phone number');
    } else if (!tac.checked) {
        showAlert('you must agree to our terms and conditions');
    } else {
        //submit form
        loader.style.display = 'block';
        let user = {
            username: usernameSignup.value,
            password: passwordSignup.value,
            email: email.value,
            number: number.value,
        }
        let endpoint = 'signupBtn';
        sendData(user, endpoint, registerSucess)
    }
}

const doLogin = () => {
    console.log('Send a login request');
    loader.style.display = 'block';
    const usernameLogin = document.querySelector('#usernameLogin');
    const passwordLogin = document.querySelector('#passwordLogin');
    const rememberme = document.querySelector('#rememberme');

    //TODO: Add form validation
    let user = { username: usernameLogin.value, password: passwordLogin.value, rememberme: rememberme.checked };
    console.log(rememberme.checked);
    console.log(JSON.stringify(user));
    let endpoint = 'loginBtn';
    sendData(user, endpoint, loginSuccess);
}

function doLogout() {
    fetch(("/logout"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
    })
        .then(response => response.json())
        .then((content) => {
            if ('data' in content) {
                console.log("Logout done and cookies deleted!");
                window.location.replace("http://localhost:3000/MainPage/home.html");
                showLoginOrLogout("login");
            }

        })
        .catch(failure);
}

function sendData(user, endpoint, callback) {
    let url = `http://localhost:3000/${endpoint}`;
    let h = new Headers();
    h.append('content-Type', 'application/json');
    let req = new Request(url, {
        method: 'POST',
        headers: h,
        body: JSON.stringify(user),
    });
    fetch(req)
        .then((res) => res.json())
        .then((content) => {
            if ('error' in content) {
                failure(content.error);
                loader.style.display = 'none';
            }
            if ('data' in content) {
                callback(content.data);
            }
        })
        .catch(failure);
}

function registerSucess(data) {
    loader.style.display = 'none';
    window.location.replace("http://localhost:3000/login.html")
}

function loginSuccess(data) {
    //we have a token so put it in localstorage
    sessionStorage.setItem('myapp-token', data.token);
    loader.style.display = 'none';
    window.location.replace("http://localhost:3000/MainPage/home.html")
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    loader.style.display = 'none';
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000)
}

function failure(err) {
    if ((window.location.pathname === "/login.html" || window.location.pathname === "/signup.html")) {
        showAlert(err.message);
    }
    console.warn(err.code, err.message);
}

function checkIfHasCookies() {
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
                let curPath = window.location.pathname;
                if (content.data.ans && document.cookie) {
                    //Have cookies - cases:
                    if (curPath === "/login.html" || curPath === "/signup.html") {
                        window.location.replace("http://localhost:3000/MainPage/home.html");
                    }
                    else if(content.data.admin) {
                        //Admin
                        if(curPath !== "/addProductPage/addProduct.html"){
                            showLoginOrLogout("logout");
                            document.querySelector('#adminBtn').style.display = 'block'
                        }   
                    }
                    else{
                        //Regular User
                        document.querySelector('#adminBtn').style.display = 'none'
                        showLoginOrLogout("logout");
                        if(curPath === "/AdminPage/admin.html"){
                            window.location.replace("http://localhost:3000/404.html");
                        }  
                    }
                }
                else {
                    //No cookies
                    if (curPath === "/CartPage/cart.html" || curPath === "/BlogPage/blog.html" || curPath === "/AboutPage/about.html" || curPath === "/ContactPage/contact.html" ) {
                        window.location.replace("http://localhost:3000/login.html");
                    }
                    else if (curPath === "/login.html" || curPath === "/signup.html") {
                        //do Noting
                    }
                    else if(curPath === "/AdminPage/admin.html"){
                        window.location.replace("http://localhost:3000/404.html");
                    }
                    else {
                        showLoginOrLogout("login");
                        document.querySelector('#adminBtn').style.display = 'none'

                    }
                }
            }
        })
        .catch(failure);
}

function checkingUrl() {
    let path = { path: window.location.pathname }
    fetch(("/checkUrl"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
        body: JSON.stringify(path),
    })
        .then(response => response.json())
        .then((content) => {

        }
        )
        .catch(failure);
}

function showLoginOrLogout(btnToShow) {
    if (btnToShow === "login") {
        logoutNavBtn.style.display = 'none';
        logoutNavBtnMobile.style.display = 'none';
        loginNavBtn.style.display = 'block';
        loginNavBtnMobile.style.display = 'block';
    } else {
        loginNavBtn.style.display = 'none';
        loginNavBtnMobile.style.display = 'none';
        logoutNavBtn.style.display = 'block';
        logoutNavBtnMobile.style.display = 'block';
    }
}



