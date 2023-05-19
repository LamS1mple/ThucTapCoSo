function chuyen(a){
    return new Intl.NumberFormat('vi-VN').format(a);
}
let ship = 40000
let tienTamTinh = 0
let tinhtong = 0
let capbac = document.getElementById("capbac").getAttribute("value")
const tienan = document.getElementById("tienan")
const phiship = document.getElementById("ship")
const tongtien = document.getElementById("tong")
phiship.innerHTML = chuyen(ship) +"đ"
let check = true
let tichtien = 0;
let tiencapbac = 0;
if (capbac < 1000000){
    tiencapbac = 0;
}else{
    if (capbac >= 5000000){
        tiencapbac = 20000;
    }
    else{
        tiencapbac = 10000;
    }
}
document.querySelector("input[type=checkbox]").addEventListener("click", function(e){
    if (this.checked ===  true){
        console.log("a")
        tichtien = Number.parseInt(this.getAttribute("value"))
    }
    else{
        tichtien = 0
    }
    tinhtong = tienTamTinh + ship - tichtien 
    tienan.setAttribute("value" , tinhtong)
    tongtien.innerHTML = chuyen(tinhtong) + "đ"
})
ship = 40000 - tiencapbac
document.querySelectorAll(".chung").forEach((Element , index)=>{
    Element.addEventListener("click", function(e){
        check = false
        if (index === 1){
            ship = 40000 - tiencapbac

            document.querySelectorAll("input[type=radio]")[1].checked = true
            document.querySelectorAll("input[type=radio]")[0].checked = false
        }
        else{
            ship = 20000 - tiencapbac

            document.querySelectorAll("input[type=radio]")[1].checked = false
            document.querySelectorAll("input[type=radio]")[0].checked = true
        }
        tinhtong = tienTamTinh + ship - tichtien 
        if (ship === 0){
            phiship.innerHTML = "Miễn phí"

        }else{
            phiship.innerHTML = chuyen(ship) + "đ"
        }
        tienan.setAttribute("value" , tinhtong)
        tongtien.innerHTML = chuyen(tinhtong) + "đ"
    })
})
phiship.innerHTML = chuyen(ship) + "đ"
var soluong = 0 ;
document.querySelectorAll(".anh-san-pham > span").forEach(Element =>{
    soluong += Number.parseInt( Element.innerText );
})

document.querySelectorAll("h2")[2].innerHTML  = `Đơn hàng (${soluong} sản phẩm)`

document.querySelectorAll(".tiensp").forEach(Element =>{
    tienTamTinh += Number.parseInt(Element.getAttribute("value"))
})
tinhtong = tienTamTinh + ship - tichtien 
document.getElementById("tientam").innerHTML = chuyen(tienTamTinh) +"đ"
tongtien.innerHTML = chuyen(tinhtong) +"đ"

document.querySelector("button[type=submit]").addEventListener("click" , function(e){
    if (check){
        e.preventDefault()
        alert("Chọn phương thức thanh toán")
    }
})
