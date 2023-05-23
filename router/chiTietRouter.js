const express = require("express")
const router = express.Router();
const sanPham = require('../models/sanpham');
const User = require("../models/user")
const Order = require("../models/order")
const { title } = require("process");

router.get("/sanpham/:id", async function(req,res){
    req.session.url = req.originalUrl
    const sp = await sanPham.findById(req.params.id).exec()
    // console.log( (new Date).toString(),(new Date(sp.ngayban)).toString() )
    // console.log(Date.parse((new Date).toString()) - Date.parse((new Date(sp.ngayban)).toString() ))
    let user ; 
    if (req.session.user){   
        user = await User.findById(req.session.user._id)
    }
    res.render("chitiet",{
        title:"AA",
        sp:sp,
        user:user,
    })
})


router.post("/sanpham/:id",async function(req ,res){
    if (req.session.user === undefined){
        res.redirect("/login")
    }
    else{
        
        const order = new Order({
            sanphamID: req.params.id,
            userID : req.session.user._id,
            mausac : req.body.mausac,
            kichco : req.body.kichco,
            soluong : req.body.soluong,
            dattruoc: Math.ceil(req.body.dattruoc)
        })
        console.log(order.dattruoc, Math.ceil(req.body.dattruoc))
        await order.save()

        res.redirect("/giohang")
        
        // await Order.findOne({userID :req.session.user._id }).populate("sanphamID").
        // exec(function(err , user){
        //     if (err) return handleError(err);
        //     console.log( user);
        // })
       
    }
})

module.exports = router;