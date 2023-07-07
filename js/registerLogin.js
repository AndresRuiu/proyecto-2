const container = document.querySelector(".container"),
pwshowHide = document.querySelectorAll(".showHidePw"),
pwFields = document.querySelectorAll(".password"),
registrarse = document.querySelector(".signup-link"),
ingresar = document.querySelector(".login-link");

pwshowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () =>{
        pwFields.forEach(pwFields =>{
            if(pwFields.type === "password"){
                pwFields.type = "text";

                pwshowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash","uil-eye");
                })
            }else{
                pwFields.type = "password";

                pwshowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye","uil-eye-slash");
                })
            }
        })
    })
});

registrarse.addEventListener("click",() => {
    container.classList.add("active");
})
ingresar.addEventListener("click", ()=> {
    container.classList.remove("active");
})