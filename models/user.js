const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    ten:String,
    taikhoan: String,
    matkhau: String,
    tichtien: {
        type :Number,
        default: 0 
    },
    sotiendamua:{
        type :Number,
        default: 0 
    },
    ngayMuaHangGanNhat:{
        type: String,
        default: (new Date).toString()
    }

})
UserSchema.methods.tinhTimeThoi = function(){
    return Math.round((Date.parse((new Date).toString()) - Date.parse((new Date(this.ngayMuaHangGanNhat)).toString() )) /86400000)
}
UserSchema.methods.chuyenTienThoi = function(a){
  return new Intl.NumberFormat('vi-VN').format(a);
}
UserSchema.methods.capBac = function(){
    if (this.sotiendamua < 1000000){
        return "Đồng"
    }
    if(this.sotiendamua >= 5000000){
        return "Vàng"
    }
    return "Bạc"
}

module.exports = mongoose.model("user",UserSchema);