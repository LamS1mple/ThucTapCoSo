document.querySelector("body").addEventListener("wheel" , (e)=>{
    const body = document.querySelector(".header");
    if (e.deltaY > 0){
        body.classList.remove("header-scroll")
    }
    else{
        if (e.deltaY < 0){
            body.classList.add("header-scroll")
        }
    }
})

