var soluong = 1;
var tongtien = 0;

const checks = document.querySelectorAll("input[type=checkbox]");
const hangs = document.querySelectorAll(".sp");
tiensp()

document.querySelectorAll(".bam").forEach((Element , index) => {
  Element.addEventListener("click", function (e) {
    e.preventDefault();
    let diem = document.querySelectorAll("input[type=number]");
    soluong = diem[Number.parseInt(index/2)].getAttribute("value")
    diem = diem[Number.parseInt(index/2)]
    const gia = document.querySelectorAll(".gia:last-child")[Number.parseInt(index/2)].getAttribute("value");
    const tiencu = gia * soluong ;
    if (this.getAttribute("value") === "tru" && soluong > 1) {
      diem.setAttribute("value", --soluong);
    }
    if (this.getAttribute("value") === "cong") {
      diem.setAttribute("value", ++soluong);
    }
    if (checks[Number.parseInt(index/2)].checked === true){
      tongtien = tongtien - tiencu + soluong * gia;
      document.querySelector("#full-tien").innerHTML = 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tongtien);
    }
    tiensp()
    $.post("http://localhost:3000/giohang",{
    soluong: soluong,
    id : this.getAttribute("name")
    })
  });
});

function tiensp(){
  document.querySelectorAll(".thongtin-sp").forEach(e =>{
    let tien = e.querySelector(".gia:last-child").getAttribute("value") * e.querySelector("input[type=number]").getAttribute("value")
    e.querySelector('.tong-tien-sp > p').innerHTML = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tien)
  })
}

checks.forEach((Element , index )=>{
  Element.addEventListener("click" , function(e){
    let tien = hangs[index].querySelector(".gia:last-child").getAttribute("value") 
    * hangs[index].querySelector("input[type=number]").getAttribute("value")
    if (this.checked === true){
      tongtien += tien
    }
    else{
      tongtien -= tien;
    }
    document.querySelector("#full-tien").innerHTML = 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tongtien)
  })
})

document.querySelector("button[type=submit]").addEventListener("click", function(e){
  let checked = false
  document.querySelectorAll("input[type=checkbox]").forEach(Element=>{
    if (Element.checked){
      checked = true
    }
  })
  if (!checked){
    e.preventDefault()
    alert("Hãy chọn sản phẩm trước khi thanh toán")
  }
})

