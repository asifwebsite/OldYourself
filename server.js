// importing packages
const express = require('express');
// const cors = require('cors');
const path = require('path');

var fs = require('fs');

//bcrypt for security
const bcrypt = require('bcrypt');
const saltRounds = 13;

//uuid
const uuidv4 = require('uuid').v4;
// declare static path
let staticPath = path.join(__dirname, "src");

//intializing express.js
const app = express();

// // users array
// const users = require('./persist').users;


//sessions array
const sessions = {};

//middlewares
app.use(express.static(staticPath));
app.use(express.json());
// app.use(cors());

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})


//users
let users = {}
users['admin'] = {
    "id": 1030139040840810805,
    "password": "$2b$13$/nfwHoNLQwzcvnjNWkCGCuTwdihn0Whlgh9g19wZuGqaxTJtFXYhG",
    'cartItems': [],
    loginHistory: [],
    'purchases': [],
}
fs.writeFileSync('usersDB.json', JSON.stringify(users, null, 2));


//products
let productsList = fs.readFileSync('productsInit.json', 'utf-8');
fs.writeFileSync("productsDB.json", productsList)


//routes
//home route
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "/MainPage/home.html"));
})

app.post('/checkCookies', (req, res) => {
    let isCookie = isValidCookie(req)[0];
    let isAdmin = isValidCookie(req)[1];
    res.status(200).send({ data: { ans: isCookie, admin: isAdmin } })
})

app.post('/checkAdminShop', (req, res) => {
    let isAdmin = isValidCookie(req)[1];
    res.status(200).send({ data: { admin: isAdmin } })
})

app.post('/signupBtn', async (req, res) => {
    //get username and password from req.body
    //check if username already exist
    try {
        const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
        const users = JSON.parse(jsonString);
        if (!(req.body.username in users)) {
            //hashing password
            let passHash = await bcrypt.hash(req.body.password, saltRounds);

            // add the new user to users data
            let newUser = {
                "id": Date.now(),
                "password": passHash,
                "cartItems": [],
                "loginHistory": [],
                "purchases": []
            }
            users[req.body.username] = newUser;
            //send a response
            fs.writeFileSync("usersDB.json", JSON.stringify(users, null, 2))
            res.status(201).send({ data: newUser });
        } else {
            res.status(400).send({ error: { code: 400, message: 'username already used' } });
        }
    } catch (err) {
        console.log(err)
    }
});


app.post('/loginBtn', async (req, res) => {
    //get username and password from req.body
    //find the match for username
    try {
        const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
        const users = JSON.parse(jsonString);
        let submittedPass = req.body.password;
        let username = req.body.username;
        if (username in users && submittedPass) {
            let userMatch = users[username];
            let savedPass = userMatch.password;
            //Checking if the password is correct
            const isPasswordMatch = await bcrypt.compare("" + submittedPass, savedPass);
            if (isPasswordMatch) {
                // const curUser = {username:req.body.username}
                const sessionId = uuidv4();
                let cookieTime = 30 * 60;
                if (req.body.rememberme) {
                    cookieTime = 864000;
                }
                res.set('Set-Cookie', `session=${sessionId};Max-Age=${cookieTime}`)
                sessions[sessionId] = username;
                setTimeout(() => {
                    delete sessions[sessionId]
                }, 1000 * cookieTime);

                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                users[username].loginHistory.push(dateTime);
                fs.writeFileSync("usersDB.json", JSON.stringify(users, null, 2))

                res.status(200).send({ data: { token: 'this is a pretend token', username: req.body.username, sessionId: sessionId } })
            }
            else {
                res.status(401).send({ error: { code: 401, message: 'invalid username or password.' } })
            }

        } else {
            //for security, pretend that email exist to delay the proccess
            let fakePass = `$2b$${saltRounds}$invalidusernameandpassword12212133134414`
            //slow the proccess
            let newPass = "1"
            if(submittedPass){
                await bcrypt.compare(submittedPass, fakePass);
            } else{
                await bcrypt.compare(newPass, fakePass);
            }
            res.status(401).send({ error: { code: 401, message: 'invalid username or password.' } })
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/logout', (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    delete sessions[sessionId];
    res.set('Set-Cookie', 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).send({ data: true });

})

app.post('/cartList', (req, res) => {
    try {
        const sessionId = req.headers.cookie?.split('=')[1];
        const username = sessions[sessionId];
        if (username) {
            const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
            let users = JSON.parse(jsonString);
            res.status(200).send({ data: users[username].cartItems });
        }
    } catch (error) {
        res.status(401).send({ error: { code: 401, message: "must login to view the cart!" } })
    }

});

app.post('/loadProducts', (req, res) => {
    try {
        const jsonString = fs.readFileSync("productsDB.json", 'utf-8');
        const products = JSON.parse(jsonString);
        res.status(200).send({ data: products });

    } catch (error) {
        res.status(400).send({ error: { code: 400, message: error } });

    }
})


app.post('/addItemToShopDB', (req, res) => {
    console.log("Adding items")
    const sessionId = req.headers.cookie?.split('=')[1];
    const username = sessions[sessionId];
 
    if (username === "admin") {
        try {
            const jsonString = fs.readFileSync('productsDB.json', 'utf-8');
            let products = JSON.parse(jsonString);
            let productId= req.body.id
            products[productId] = req.body[productId]
            fs.writeFileSync("productsDB.json", JSON.stringify(products, null, 2))
            console.log("Product add: ", productId)
            res.status(200).send({ data:`product: ${productId}, add to shop`});
        } catch (err) {
            res.status(401).send({ error: { code: 401, message: err } })
        }
 
    } else {
        res.status(401).send({ error: { code: 401, message: "Just Admin Can add Items" } })
    }
})

app.post('/removeItemFromShopDB', (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    const username = sessions[sessionId];
    if (username === "admin") {
        try {
            const jsonString = fs.readFileSync('productsDB.json', 'utf-8');
            let products = JSON.parse(jsonString);
            let productId = req.body.id
            let productTitle = products[productId].title
            delete products[productId];
            fs.writeFileSync("productsDB.json", JSON.stringify(products, null, 2))
            res.status(200).send({ data: `product: ${productTitle} removed from shop`});
        } catch (err) {
            res.status(401).send({ error: { code: 401, message: err } })
        }

    } else {
        res.status(401).send({ error: { code: 401, message: "Just Admin Can Remove Items" } })
    }
})

app.post('/addToCart', (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    const username = sessions[sessionId];
    console.log("username", username);
    if (username) {
        try {
            const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
            let users = JSON.parse(jsonString);
            if (!(users[username].cartItems.hasOwnProperty(req.body))) {
                users[username].cartItems.push(req.body)
                fs.writeFileSync("usersDB.json", JSON.stringify(users, null, 2))
                res.status(200).send({ data: `Product: ${req.body.title}, added to your cart` })
            }
        } catch (err) {
            console.log(err);
            res.status(401).send({ error: { code: 401, message: err } })
        }
    } else {
        res.status(401).send({ error: { code: 401, message: "must login to add items to cart!" } })
    }
});

app.post('/removeItemFromCartDB', (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    const username = sessions[sessionId];
    if (username) {
        try {
            const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
            let users = JSON.parse(jsonString);
            const indexOfProduct = users[username].cartItems.findIndex(object => {
                return object.title === req.body.title;
            });

            if (indexOfProduct != -1) {
                users[username].cartItems.splice(indexOfProduct, 1);
                fs.writeFileSync("usersDB.json", JSON.stringify(users, null, 2))
                res.status(200).send({ data: { product: req.body.title, message: "removed" } })
            } else {
                res.status(401).send({ error: { code: 401, message: "Item deleted from html was no in db cart" } })
            }
        } catch (err) {
            console.log(err);
            res.status(401).send({ error: { code: 401, message: err } })
        }
    } else {
        res.status(401).send({ error: { code: 401, message: "must login to add items to cart!" } })
    }
});

app.post('/checkOut', (req, res) => {
    const sessionId = req.headers.cookie?.split('=')[1];
    const username = sessions[sessionId];
    if (username) {
        try {
            const jsonString = fs.readFileSync('usersDB.json', 'utf-8');
            let users = JSON.parse(jsonString);
            var cart = users[username].cartItems
            for (var i = 0; i < cart.length; i++) {
                users[username].purchases.push(cart[i])
            }
            users[username].cartItems = [];
            fs.writeFileSync("usersDB.json", JSON.stringify(users, null, 2))
            res.status(200).send({ data: { product: req.body.title, message: "Purchases sold successfully" } })

        } catch (error) {
            console.log(err);
            res.status(401).send({ error: { code: 401, message: err } })

        }
    } else {
        res.status(401).send({ error: { code: 401, message: "must login to buy items!" } })
    }
});

app.post('/displayAdminScreen', (req, res) => {
    let isAdmin = isValidCookie(req)[1];
    if (isAdmin) {
        try {
            const jsonStringUsers = fs.readFileSync("usersDB.json", 'utf-8');
            const users = JSON.parse(jsonStringUsers);
            res.status(200).send({ data: users });

        } catch (error) {
            res.status(400).send({ error: { code: 400, message: error } });

        }
    }
})

// 404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

function isValidCookie(req) {
    const sessionId = req.headers.cookie?.split('=')[1];
    const userSession = sessions[sessionId];
    if (!userSession) {
        return [false, false]
    } else {
        if (userSession === "admin") {
            return [true, true];
        } else {
            return [true, false]
        }
    }
}

