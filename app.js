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



var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "pay with MoMo";
var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";
// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
var amount = "50000";
var requestType = "captureWallet"
var extraData = ""; //pass empty value if your merchant does not have stores

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
//puts raw signature
// console.log("--------------------RAW SIGNATURE----------------")
// console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
// console.log("--------------------SIGNATURE----------------")
// console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
    lang: 'en'
});
//Create the HTTPS objects
const https = require('https');
const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
}
//Send the request and get the response
const req = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
        console.log('Body: ');
        console.log(body);
        console.log('payUrl: ');
        console.log(JSON.parse(body).payUrl);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
// write data to request body
console.log("Sending....")
req.write(requestBody);
req.end();


app.listen(port, (e)=>{
    console.log(`LISTENING ${port}`)
})