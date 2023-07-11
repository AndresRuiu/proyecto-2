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

var usuarios = [
    {
        nombre: "admin",
        email: "admin@example.com",
        contraseña: "admin123"
    }
];

function registrarUsuario(nombre, email, contraseña) {
    var usuario = {
        nombre: nombre,
        email: email,
        contraseña: contraseña,
        estado: "En espera"
    };
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function validarUsuario(nombre, contraseña) {
    var usuarioValido = false;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre && usuarios[i].contraseña === contraseña) {
            if (usuarios[i].estado === "En espera") {
                var errorElement = document.createElement("div");
                errorElement.textContent = "Aun no fue admitido";
                errorElement.style.color = "red";
                document.querySelector(".login form").appendChild(errorElement);
            } else {
                usuarioValido = true;
            }
            break;
        }
    }
    return usuarioValido;
}


document.querySelector(".signup .input-field.button input").addEventListener("click", function() {
    var nombre = document.querySelector(".signup .input-field:nth-of-type(1) input").value;
    var email = document.querySelector(".signup .input-field:nth-of-type(2) input").value;
    var contraseña = document.querySelector(".signup .input-field:nth-of-type(3) input").value;
    var confirmarContraseña = document.querySelector(".signup .input-field:nth-of-type(4) input").value;
    if (contraseña === confirmarContraseña) {
        registrarUsuario(nombre, email, contraseña);
        var successElement = document.createElement("div");
        successElement.textContent = "Su registro fue exitoso";
        successElement.style.color = "green";
        document.querySelector(".signup form").appendChild(successElement);
        setTimeout(function() {
            window.location.href = "./registerLogin.html";
        }, 2000);
    } else {
        var errorElement = document.createElement("div");
        errorElement.textContent = "Las contraseñas no coinciden";
        errorElement.style.color = "red";
        document.querySelector(".signup form").appendChild(errorElement);
    }
});




document.querySelector(".login .input-field.button input").addEventListener("click", function() {
    var nombre = document.querySelector(".login .input-field:nth-child(1) input").value;
    var contraseña = document.querySelector(".login .input-field:nth-child(2) input").value;
    if (validarUsuario(nombre, contraseña)) {
        localStorage.setItem("usuarioActual", nombre);
        window.location.href = "../index.html";
    } else {
        var usuarioEnEspera = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].nombre === nombre && usuarios[i].estado === "En espera") {
                usuarioEnEspera = true;
                break;
            }
        }
        if (!usuarioEnEspera) {
            var errorElement = document.createElement("div");
            errorElement.textContent = "Usuario o contraseña inválidos";
            errorElement.style.color = "red";
            document.querySelector(".login form").appendChild(errorElement);
        }
    }
});



var usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (usuarios === null) {
    usuarios = [
        {
            nombre: "admin",
            email: "admin@example.com",
            contraseña: "admin123"
        }
    ];
}
for (var i = 0; i < usuarios.length; i++) {
    console.log(usuarios[i].nombre, usuarios[i].contraseña);
}

