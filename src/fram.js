
"use strict";


function createNavLogoPage() {
    const navLogoPage = document.getElementById('navLogo');
    navLogoPage.innerHTML += `
    <img src="../OldYourselfPictures/logoBack.png" class="logo" alt="">
    `;
}
function createNavLogoSingleItem() {
    const navLogoSingleItem = document.getElementById('navLogo');
    navLogoSingleItem.innerHTML += `
    <img src="../../OldYourselfPictures/logoBack.png" class="logo" alt="">
    `;
}


function createNavMobilePage() {
    let navMobilePage = document.getElementById('mobilePage');
    navMobilePage.innerHTML += `
    <li id="logoutBtnMobile"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtnMobile"><a href="../login.html">Login</a></li>
    <li id="lg-bagMobile"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <i id="bar" class="fas fa-outdent"></i>
    `;
}


const createNavMobileSingleItem = () => {
    let navMobileSinglePage = document.getElementById('mobileSingleItem');

    navMobileSinglePage.innerHTML += `
    <li id="logoutBtnMobile"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtnMobile"><a href="../../login.html">Login</a></li>
    <li id="lg-bagMobile"><a href="../../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <i id="bar" class="fas fa-outdent"></i>
    `;
}



var nav = {};

const createNavShop = () => {
    nav = document.getElementById('navbarShop');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a class="active" href="#">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>


    `;
}

function createNavHome() {
    nav = document.getElementById('navbarHome');

    nav.innerHTML = `
    <li><a class="active" href="#">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavContact() {
    nav = document.getElementById('navbarContact');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a class="active" href="#">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}
function createNavAbout() {
    nav = document.getElementById('navbarAbout');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a class="active" href="#">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}
function createNavBlog() {
    nav = document.getElementById('navbarBlog');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a class="active" href="#">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavArticle() {
    nav = document.getElementById('navbarArticle');

    nav.innerHTML = `
    <li><a href="../../MainPage/home.html">Home</a></li>
    <li><a href="../../ShopPage/shop.html">Shop</a></li>
    <li><a class="active" href="../blog.html">Blog</a></li>
    <li><a href="../../AboutPage/about.html">About</a></li>
    <li><a href="../../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../../login.html">Login</a></li>
    <li id="lg-bag"><a href="../../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavCart() {
    nav = document.getElementById('navbarCart');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../login.html">Login</a></li>
    <li id="lg-bag"><a class="active" href="#"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavAdmin() {
    nav = document.getElementById('navbarAdmin');

    nav.innerHTML = `
    <li><a href="../MainPage/home.html">Home</a></li>
    <li><a href="../ShopPage/shop.html">Shop</a></li>
    <li><a href="../BlogPage/blog.html">Blog</a></li>
    <li><a href="../AboutPage/about.html">About</a></li>
    <li><a href="../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a  class="active" href="#">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../">Login</a></li>
    <li id="lg-bag"><a href="../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavReadme() {
    nav = document.getElementById('navbarReadme');

    nav.innerHTML = `
    <li><a href="MainPage/home.html">Home</a></li>
    <li><a href="ShopPage/shop.html">Shop</a></li>
    <li><a href="BlogPage/blog.html">Blog</a></li>
    <li><a href="AboutPage/about.html">About</a></li>
    <li><a href="ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="login.html">Login</a></li>
    <li id="lg-bag"><a href="CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}

function createNavSingleItem() {
    nav = document.getElementById('navbarSingleItem');

    nav.innerHTML += `
    <li><a href="../../MainPage/home.html">Home</a></li>
    <li><a class="active" href="../shop.html">Shop</a></li>
    <li><a href="../../BlogPage/blog.html">Blog</a></li>
    <li><a href="../../AboutPage/about.html">About</a></li>
    <li><a href="../../ContactPage/contact.html">Contact</a></li>
    <li id="adminBtn"><a href="../AdminPage/admin.html">Admin</a></li>
    <li id="logoutBtn"><a href="#" onclick="doLogout()">Logout</a></li>
    <li id="loginBtn"><a href="../../login.html">Login</a></li>
    <li id="lg-bag"><a href="../../CartPage/cart.html"><i class="fa fa-shopping-cart"></i></a></li>
    <a href="#" id="close"><strong>X</strong></a>
    `;
}


function navResponsive() {

    const bar = document.getElementById('bar');
    const close = document.getElementById('close');



    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
            search.style.display = 'none';
        });
    }
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
            search.style.display = 'flex';
        });
    }
}

function createFooterPages() {
    let footerPages = document.getElementById('footerPage');

    footerPages.innerHTML += `
    <div class="col">
    <img src="../OldYourselfPictures/logoBack2.png" class="logo" alt="">
</div>
    `;
    footerPages.innerHTML += `<div class="col">
    <h4>Contact</h4>
    <p><strong>Phone:</strong> 09878965</p>
    <p><strong>Email:</strong> OldYourself@gmail.com </p>
    <p><strong>Hours:</strong> 10:00 - 18:00, Sunday - Thursday</p>
    </div>
    <div class="col">
    <h4>About</h4>
    <a href="../AboutPage/about.html#about-head">About us</a>
    <a href="../AboutPage/about.html#DeliveryInformation">Delivery information</a>
    <a href="../AboutPage/about.html#PrivacyPolicy">Privacy policy</a>
    </div>
    <div class="col">
    <h4>My Account</h4>
    <a href="../signup.html">Sign up</a>
    <a href="../login.html">Log in</a>
    <a href="../CartPage/cart.html">View cart</a>
    </div>
    </div>`;

}
function createFooterSingleItem() {
    let footerSingleItem = document.getElementById('footerSingleItem');

    footerSingleItem.innerHTML += `
    <div class="col">
    <img src="../../OldYourselfPictures/logoBack2.png" class="logo" alt="">
</div>
    `;
    footerSingleItem.innerHTML += `<div class="col">
    <h4>Contact</h4>
    <p><strong>Phone:</strong> 09878965</p>
    <p><strong>Email:</strong> OldYourself@gmail.com </p>
    <p><strong>Hours:</strong> 10:00 - 18:00, Sunday - Thursday</p>
    </div>
    <div class="col">
    <h4>About</h4>
    <a href="../../AboutPage/about.html#about-head">About us</a>
    <a href="../../AboutPage/about.html#DeliveryInformation">Delivery information</a>
    <a href="../../AboutPage/about.html#PrivacyPolicy">Privacy policy</a>
    </div>
    <div class="col">
    <h4>My Account</h4>
    <a href="../../signup.html">Sign up</a>
    <a href="../../login.html">Log in</a>
    <a href="../../CartPage/cart.html">View cart</a>
    </div>
    </div>`;

}










