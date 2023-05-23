const express = require("express");
const app = express()
const port = 3000;
const session = require('express-session')


let ejs = require('ejs');
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }}));

const bodyParser = require("body-parser")
const login = require("./router/login.js")
const signup = require("./router/signup.js")
const logout = require("./router/logout.js")
const home = require("./router/home.js");
const chitiet = require("./router/chiTietRouter.js");
const giohang = require("./router/giohang.js")
const thanhtoan = require("./router/thanhtoanCtr.js")

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BAITAPLON');
}

app.use(bodyParser.urlencoded({extended: true}));




app.use("/",home);
app.use("/",chitiet);
app.use("/" , login)
app.use("/" , signup)
app.use("/" , logout)
app.use("/" , giohang)
app.use("/" , thanhtoan)


app.listen(port, (e)=>{
    console.log(`LISTENING ${port}`)
})