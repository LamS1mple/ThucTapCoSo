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
