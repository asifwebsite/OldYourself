import fetch from "node-fetch";
import supertest from "supertest";
import request from "supertest";
import {jest} from '@jest/globals';
import app from "./server.js";
import bcrypt from "./server.js";


let saltRounds = 13;
let data = {};


describe('Testing User routes', () => {
    describe('Testing login system', ()=>{
        test('Login to website as admin', async () => {
            jest.useFakeTimers();
            const response = await fetch("http://localhost:3000/loginBtn", {method:"POST",headers: {'content-Type': 'application/json'} , body: JSON.stringify({username:"admin", password:"admin"})});
            jest.runAllTimers();
            jest.useRealTimers();
            expect(response.status).toBe(200);
        });
        test('Signup to website', async () => {
            const response = await fetch("http://localhost:3000/signupBtn", {method:"POST", headers: {'content-Type': 'application/json'}, body:JSON.stringify({username:"user", password:"user"})});
            expect(response.status).toBe(201);
        });
        test('Login to website as an enrolled user', async () => {
            const response = await fetch("http://localhost:3000/loginBtn", {method:"POST", headers: {'content-Type': 'application/json'}, body:JSON.stringify({username:"user", password:"user"})});
            expect(response.status).toBe(200);
            
        });
        test('Logout from website', async () => {
            const response = await fetch("http://localhost:3000/logout", {method:"POST"});
            expect(response.status).toBe(200);
        })
        test('Trying to Login with fake username and password', async () => {
            const response = await fetch("http://localhost:3000/loginBtn", {method:"POST", headers: {'content-Type': 'application/json'}, body:JSON.stringify({username:"fakeUsername", password:"fakePassword"})});
            expect(response.status).toBe(401);
    })
})
        describe('Testing shop system', ()=>{
            test('Get cart List of a valid user', async () => {

            });
            test('Add Item to cart', async () => {
                let product = {
                    "title": "productTitle",
                    "price":"productPrice",
                    "productImg": "productImg",
                }
                const responsUser = await fetch("http://localhost:3000/loginBtn", {method:"POST",headers: {'content-Type': 'application/json'} , body: JSON.stringify({username:"admin", password:"admin"})});
                console.log(responsUser)
                console.log(JSON.stringify(responsUser));
            
            });
            test('Load products to shop', async()=>{
                const response = await fetch("http://localhost:3000/loadProducts", {method:"POST"});
                expect(response.status).toBe(200);
            });
            test('Add Item to shop', async () => {
                let product = {
                    "title": "productTitle",
                    "price":"productPrice",
                    "productImg": "productImg",
                }
                console.log(product);
                const responsShop = await fetch("http://localhost:3000/addItemToShopDB", {method:"POST",headers: {'content-Type': 'application/json'} , body: JSON.stringify(product)});
            });
            test('Remove Item from shop', async () => {
                let product = {
                    id: "car0"
                }
                console.log(product);
                const responsShop = await fetch("http://localhost:3000/removeItemFromShopDB", {method:"POST",headers: {'content-Type': 'application/json'} , body: JSON.stringify(product)});
            });
            test('Checkout', async () => {
                //todo
            });
        })});
