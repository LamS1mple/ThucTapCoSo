const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    userID :{type: mongoose.Types.ObjectId , ref :"user"},
    sanphamID :{type: mongoose.Types.ObjectId , ref : "sanpham"},
    mausac: String,
    kichco: String,
    soluong: Number,
    dattruoc: Number
})

module.exports = mongoose.model("order", OrderSchema)