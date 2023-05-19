const { render } = require('ejs');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user")

router.get("/login", function(req , res){
  
    res.render("login")
})

router.post("/login",async function(req , res){
    const user = await User.findOne({taikhoan:req.body.email,
      matkhau:req.body.password
    }).exec()
    if (user){
      if(user.tinhTimeThoi() > 2){
        await User.findByIdAndUpdate(user._id , {
          $set:{
            sotiendamua: 0
          }
        })
      }
      req.session.user = user
      console.log(req.session.user.chuyenTienThoi(1234))
  
      res.redirect(req.session.url)
    }else{
      res.redirect("/login")
    }
})


module.exports = router