var express = require('express');

const router = express.Router();
const sanPham = require('../models/sanpham');
const User = require("../models/user")
const Order = require("../models/order")

let s = ""
let tongtien = 0
let check = true

function momo(request,response , tien ,duocchon){
    var conver = ""


    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = duocchon;
    var partnerCode = 'MOMO';

    var redirectUrl = 'http://localhost:3000/thanks';
    var ipnUrl = 'http://localhost:3000/thanks';
    var requestType = "payWithMethod";
    var amount = tien;
    var orderId =  partnerCode + new Date().getTime();
    var requestId =  partnerCode + new Date().getTime();
    var extraData ='';
    var paymentCode = 'T8Qii53fAXyUftPV3m9RhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId ='';
    var autoCapture =true;  
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');


    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
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
        // console.log(`Status: ${res.statusCode}`);
        // console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            conver = JSON.parse(body)
            
            // console.log('Body: ');
            // console.log(body);
            // console.log('resultCode: ');
            // console.log(JSON.parse(body).resultCode);
        });
        res.on('end', () => {
            response.redirect(conver.payUrl)
            console.log(conver)
            console.log('No more data in response.');
        });
    })

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    req.write(requestBody);
    req.end();
}

router.get("/thanhtoan", async function(req, res){
    

        res.render("thanhtoan",{
            title:"thanh toan",
            user:req.session.user,
        })
    
    
})

router.post("/thanhtoan", async function(req, res){
    if (req.body.a == 1 && req.body.chon_hang){
        let chon =  []
        if (!Array.isArray(req.body.chon_hang)){
            chon.push(req.body.chon_hang)
        }
        else{
            chon = req.body.chon_hang
        }
        let user ;
        if (req.session.user){   
            user = await User.findById(req.session.user._id)
        }
        let hang = []
        for (let i = 0 ; i < chon.length ; i ++){
            let a = await Order.findById(chon[i]).populate("sanphamID");
            hang.push(a)
        }
        console.log(req.session.user)
        res.render("thanhtoan",{
            title:"thanh toan",
            user:user,
            hang:hang
        })
    }else{
        res.redirect("/")
    }
})


router.post("/tinhtien" , function(request , response){
    let duocchon = []
    check = true
    tongtien = Number.parseInt(request.body.tongtien)
    s = ""

    if (!Array.isArray(request.body.duochon)){
        duocchon.push(request.body.duochon)
    }
    else{
        duocchon = request.body.duochon
    }
    for (let i = 0 ;i < duocchon.length -1 ; i++){
        s += duocchon[i]+"-"
    }
    s += duocchon[duocchon.length - 1]
    console.log(request.body.checkcheck)
    if (!request.body.checkcheck){
        check = false
    }
    if (request.body.chon == 1){
        momo(request, response , request.body.tongtien , s)
    }else{

        response.redirect("/thanks")
    }
})

router.get("/thanks",async function(req, res){
    const p = s.split("-")
    req.session.user = await User.findById(req.session.user._id)

    if (check){
        await User.findByIdAndUpdate(req.session.user._id,
            { $set: 
                { tichtien:0,
                sotiendamua: req.session.user.sotiendamua + tongtien,
                ngayMuaHangGanNhat:(new Date).toString()
                }
            })

    }
    else{
        await User.findByIdAndUpdate(req.session.user._id,
            { $set: 
                { tichtien:req.session.user.tichtien + Math.ceil(tongtien / 1000),
                sotiendamua: req.session.user.sotiendamua + tongtien,
                ngayMuaHangGanNhat:(new Date).toString()
                }
            })
    }
    req.session.user = await User.findById(req.session.user._id)
    for (let i = 0 ; i < p.length ; i ++){
        await Order.findByIdAndDelete(p[i])
    }
    res.redirect("/")

})



module.exports = router