var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const sanPham = require('../models/sanpham')
const User = require('../models/user')


router.get('/', async function (req, res) {
      req.session.url = "/"
      const a = await sanPham.find({})
      let user ;
      if (req.session.user){   
         user = await User.findById(req.session.user._id)
      }
      res.render("home", 
      {
         a:a,
         title:"home",
         user:user
      })
});
router.get("/ao" , async function(req, res){
   req.session.url = "/ao  "
   const a = await sanPham.find({type:0})
   let user ;
      if (req.session.user){   
         user = await User.findById(req.session.user._id)
      }
      res.render("home", 
      {
         a:a,
         title:"home",
         user:user
      })
})
router.get("/quan" , async function(req, res){
   req.session.url = "/quan"
   const a = await sanPham.find({type:1})
   let user ;
      if (req.session.user){   
         user = await User.findById(req.session.user._id)
      }
      res.render("home", 
      {
         a:a,
         title:"home",
         user:user
      })
})
router.get("/sanphammoi" , async function(req, res){
   req.session.url = '/'
   const a = await sanPham.find({})
   let sp = []
   for (var i = 0 ; i < a.length ; i ++){
      let time = -a[i].tinhTime()/86400000
      console.log(time)
      if (time >=  5 && time <= 30){
         sp.push(a[i])
      }
   }
   let user ; 
   if (req.session.user){   
      user = await User.findById(req.session.user._id)
   }
      

   res.render("home",{
      title:"sale",
      a:sp,
      user:req.session.user
   })
})
router.get("/sale" ,async function(req , res){
   req.session.url = '/'
   const a = await sanPham.find({})
   let sp = []
   for (var i = 0 ; i < a.length ; i ++){
      let time = a[i].tinhTime()/86400000
      console.log(time)
      if (time <= 5 && time >-1){
         sp.push(a[i])
      }
   }
   let user ; 
   if (req.session.user){   
      user = await User.findById(req.session.user._id)
   }
      

   res.render("home",{
      title:"sale",
      a:sp,
      user:req.session.user
   })
})

router.post('/', function (req, res) {
   res.send('POST route on things.');
});

module.exports = router;