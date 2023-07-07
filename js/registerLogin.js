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

// Función para agregar un usuario al arreglo y guardarlo en el local storage
function registrarUsuario(nombre, email, contraseña) {
    var usuario = {
        nombre: nombre,
        email: email,
        contraseña: contraseña
    };
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para validar las credenciales de un usuario
function validarUsuario(nombre, contraseña) {
    var usuarioValido = false;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre && usuarios[i].contraseña === contraseña) {
            usuarioValido = true;
            break;
        }
    }
    return usuarioValido;
}

// Controlador de eventos para el botón de registro
document.querySelector(".signup .input-field.button input").addEventListener("click", function() {
    var nombre = document.querySelector(".signup .input-field:nth-child(1) input").value;
    var email = document.querySelector(".signup .input-field:nth-child(2) input").value;
    var contraseña = document.querySelector(".signup .input-field:nth-child(3) input").value;
    registrarUsuario(nombre, email, contraseña);
});

// Controlador de eventos para el botón de inicio de sesión
document.querySelector(".login .input-field.button input").addEventListener("click", function() {
    var nombre = document.querySelector(".login .input-field:nth-child(1) input").value;
    var contraseña = document.querySelector(".login .input-field:nth-child(2) input").value;
    if (validarUsuario(nombre, contraseña)) {
        // El usuario es válido, guardar su nombre en el local storage y redirigir a la página principal
        localStorage.setItem("usuarioActual", nombre);
        window.location.href = "../index.html";
    } else {
        // El usuario no es válido, mostrar un mensaje de error
        var errorElement = document.createElement("div");
        errorElement.textContent = "Usuario o contraseña inválidos";
        errorElement.style.color = "red";
        document.querySelector(".login form").appendChild(errorElement);
    }
});




//var usuarios = JSON.parse(localStorage.getItem("usuarios"));

// Mostrar la lista de usuarios
//for (var i = 0; i < usuarios.length; i++) {
//    console.log(usuarios[i].nombre,usuarios[i].contraseña);
//}
