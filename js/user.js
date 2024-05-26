let userinfo = document.querySelector("#userinfo")
let userdata = document.querySelector("#userdata")
let links = document.querySelector("#links")

if(localStorage.getItem("username")){
    links.remove()
    userinfo.style.display="block"
    userdata.innerHTML = localStorage.getItem("username")
}
let logout =document.querySelector("#logout")
logout.addEventListener("click",function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location="index.html"
    },5)

})