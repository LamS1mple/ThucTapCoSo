var mausac = "";
var kichco = "";
var soluong = 1;

const imgs = document.querySelectorAll(".anh");
imgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    console.log(document.querySelector(".anh1"));
    document
      .querySelector(".anh1")
      .setAttribute("src", this.getAttribute("src"));
  });
});

function remove(a) {
  document.querySelectorAll(a).forEach((Element) => {
    Element.classList.remove("active");
  });
}
document.querySelectorAll(".chon-mau-sac").forEach((Element) => {
  Element.addEventListener("click", function (e) {
    if (!this.classList.contains("active")) {
      remove(".chon-mau-sac");
      this.classList.add("active");
      mausac = this.querySelector("span").getAttribute("value");
    }
  });
});

document.querySelectorAll(".chon-kich-co").forEach((Element) => {
  Element.addEventListener("click", function (e) {
    if (!this.classList.contains("active")) {
      remove(".chon-kich-co");
      this.classList.add("active");
      kichco = this.innerText;
    }
  });
});

document.querySelectorAll(".bam").forEach((Element) => {
  Element.addEventListener("click", function (e) {
    e.preventDefault()
    const diem = document.querySelector("input[type=number]");
    soluong = Number(diem.getAttribute("value"));
    if (this.getAttribute("value") === "tru" && soluong > 1) {
      diem.setAttribute("value", --soluong);
    }
    if (this.getAttribute("value") === "cong") {
      diem.setAttribute("value", ++soluong);
    }
  });
});

document.querySelectorAll(".them-danh-sach").forEach((Element) => {
  Element.addEventListener("click", function (e) {
    
      if (mausac === "") {
        e.preventDefault()
        alert("Hãy chọn màu sắc");
      } else {
        if (kichco === "") {
          e.preventDefault()

          alert("Hãy chọn kích cỡ");
        } else {
          if (this.getAttribute("value") === "1") {
           send()
          }
          else{
            send()
          }
        }
      
    } 
  });
});

function send() {
  document.querySelector("input[name=mausac]").setAttribute("value",mausac)
  document.querySelector("input[name=kichco]").setAttribute("value",kichco)
  document.querySelector("input[name=soluong]").setAttribute("value",soluong)
}






function tinh(cao , nang){
  if (cao <= 159){
      if (nang <= 54){
          return `<p>S-Áo</p>`
      }
      if (nang <= 61){
          return (
              `
              <p>S-Áo</p>
              <p>M-Quần</p>
              `)
      }
      if (nang <= 70){
          return (
              `
              <p>L-Áo</p>
              <p>L-Quần</p>
              `)
      }
      return '<p>Xin vui lòng xem bảng size</p>'
  }
  if (cao <= 165 ){
      if ( nang >= 61 && nang < 65 ){
          return (
          `
              <p>M-Áo</p>
              <p>L-Quần</p>
          `
          )
      }
      if (nang >= 65 && nang <= 70){
          return (
          `
              <p>L-Áo</p>
              <p>L-Quần</p>
          `
          )
      }
      if (nang >= 70 && nang <= 80){
          return (
          `
              <p>XL-Áo</p>
              <p>XL-Quần</p>
          `
          )
      }
      return '<p>Xin vui lòng xem bảng size</p>'
  }
  return (
          `
              <p>XL-Áo</p>
              <p>L-Quần</p>
          `
  )

}

let cao = 155;
let nang = 48;

document.querySelector("#mott").addEventListener("mousemove", function(e){
  cao = this.value
  document.querySelector("#tinh-chieu-cao").innerHTML= "Chiều cao: " + cao + "cm"
  document.querySelector("#goi-y").innerHTML = tinh(cao, nang);


})
document.querySelector("#haii").addEventListener("mousemove", function(e){
  nang = this.value
  document.querySelector("#tinh-can-nang").innerHTML= "Cân nặng: " + nang + "kg"
  document.querySelector("#goi-y").innerHTML = tinh(cao, nang);

})