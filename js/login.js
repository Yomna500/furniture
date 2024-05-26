let username =  document.querySelector("#username")
let password =  document.querySelector("#password")
let signin=  document.querySelector("#signin")
let getUser = localStorage.getItem("username")
let getPassword = localStorage.getItem("password")

signin.addEventListener("click" , function(e){
    e.preventDefault()
    if(username.value=="" || password.value==""){
        alert("please fill the information")

    }else{
        if(getUser && getUser.trim() == username.value.trim() && getPassword && getPassword.trim() == password.value){

            setTimeout ( () => {
                window.location = "index.html"
            } , 5)
        }else {
            alert("username or password is wrong ")
        }

    }
})
