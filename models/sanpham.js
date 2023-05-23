const mongoose = require("mongoose");

const SanPhanSchema = new mongoose.Schema({
  tenSanPham: String,
  gia: Number,
  kichco: Array,
  sale1: Number,
  sale2: Number,
  anh: Array,
  mauSac: Array,
  ngayban: String,
  sale: Number,
  giaban: Number,
  kiemtra: Boolean,
  type : Number
});

SanPhanSchema.methods.tinhtien = function(sale3) {
  if (!sale3){
    return (this.giaban * (100 - this.sale)) / 100;
    
  }
  else{
    return (this.giaban * (100 - this.sale2 - sale3 )) / 100;

  }
  // if ( this.tinhTime() <= 0 && this.tinhTime() > -86400000){
  //   if(!sale3){
  //     return (this.giaban * (100 - this.sale2 )) / 100;

  //   }
  // }
};

SanPhanSchema.methods.tinhTime = function(){
    return -Date.parse((new Date).toString()) + Date.parse((new Date(this.ngayban)).toString() )
}
SanPhanSchema.methods.chuyenTien = function(a){
  return new Intl.NumberFormat('vi-VN').format(a);
}

module.exports = mongoose.model("sanpham", SanPhanSchema);
