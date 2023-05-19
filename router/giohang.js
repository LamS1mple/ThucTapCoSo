var express = require('express');

const router = express.Router();
const sanPham = require('../models/sanpham');
const User = require("../models/user")
const Order = require("../models/order")


router.get("/giohang", async function(req, res){
    req.session.url = req.originalUrl
    if (req.session.user){
        let user ; 
        if (req.session.user){   
            user = await User.findById(req.session.user._id)
        }
        const hang = await Order.find({userID: req.session.user._id}).populate("sanphamID")
        res.render("giohang", {
            title:"gio hang",
            user:user,
            hang:hang
        })
    }
    else{
        res.redirect("/login")
    }
})
router.post("/giohang", async function(req, res){

    req.session.url = req.originalUrl
    if (req.session.user){

        if (req.body.id){
            const p = {
                id : req.body.id,
                soluong: req.body.soluong,

            }
            await Order.findByIdAndUpdate({_id:p.id } , {soluong:p.soluong})
        }
        let user ; 
        if (req.session.user){   
            user = await User.findById(req.session.user._id)
        }
        const hang = await Order.find({userID: req.session.user._id}).populate("sanphamID")
        res.render("giohang", {
            title:"home",
            user:user,
            hang:hang
        })
    }
    else{
        res.redirect("/login")
    }
})
router.get("/xoa/:id",async function(req, res){
    await Order.findByIdAndDelete({_id:req.params.id})
    res.redirect("/giohang")
})
module.exports = router