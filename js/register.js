let email =  document.querySelector("#email")
let username =  document.querySelector("#username")
let password =  document.querySelector("#password")
let signup=  document.querySelector("#signup")

signup.addEventListener("click" , function(e){
    e.preventDefault()
    if(username.value=="" || email.value=="" || password.value==""){
        alert("please fill the information")
    }else{
        localStorage.setItem("email",email.value)
        localStorage.setItem("username",username.value)
        localStorage.setItem("password",password.value)

        setTimeout ( () => {
            window.location = "login.html"
        } , 5)
    }
})
