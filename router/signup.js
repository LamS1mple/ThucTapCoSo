const express = require("express")
const router = express.Router();
const User = require("../models/user")

router.get("/signup" , function(req ,res){
    res.render("signup")
})

router.post("/signup", async function (req , res){
    const email = req.body.email
    console.log(req.body.email)
    const check = await User.findOne({taikhoan:email})

    if (check === null && email !== '' 
    && req.body.password !== ''
    && req.body.ten !== ''
    ){
        const user = new User();
        user.ten = req.body.ten
        user.taikhoan = email
        user.matkhau = req.body.password
        await user.save()
        res.render("login")
    }
    else{
        res.render("signup",{
            trung:"Nhập lại email"
        })
    }
    
})


module.exports = router