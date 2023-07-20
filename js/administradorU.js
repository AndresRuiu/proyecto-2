function cambiarBoton() {
  var botonIngresar = document.getElementById("ingresar");
  var botonCerrarSesion = document.getElementById("cerrar-sesion");

  var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  var tipo;
  if (usuarioActual && usuarioActual.tipo === "admin") {
    tipo = "admin";
  } else if (usuarioActual && usuarioActual.tipo === "user") {
    tipo = "user";
  } else {
    tipo = "none";
  }
  
    if (tipo == "admin") {
      console.log("Cambiando el estilo de los botones");
      botonIngresar.style.display = "none";
      botonCerrarSesion.style.display = "inline-block";
    } 
  }
  
  document.getElementById("cerrar-sesion").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("usuarioActual");
    window.location.href = '../index.html';
});
  
  
  function cambiarEstadoUsuario(nombre, nuevoEstado) {
    if (nombre === 'admin') {
        return;
    }
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre) {
            if (nuevoEstado === 'suspendido') {
                usuarios.splice(i, 1);
            } else {
                usuarios[i].estado = nuevoEstado;
            }
            break;
        }
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    let botonAprobar = document.querySelector(`#tabla-usuarios .aprobar[data-nombre="${nombre}"]`)
    if (botonAprobar) {
        botonAprobar.textContent = nuevoEstado === 'Aprobado' ? 'Poner en espera' : 'Aprobar'
    }
    cargarUsuarios()
}

  
  function validarUsuario(nombre, contraseña) {
    var usuarioValido = false;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === nombre && usuarios[i].contraseña === contraseña && usuarios[i].estado === "Aprobado") {
            usuarioValido = true;
            break;
        }
    }
    return usuarioValido;
  }
  
  function cargarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    
    let tbody = document.querySelector('#tabla-usuarios tbody')
    
    tbody.innerHTML = ''
    
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nombre === 'admin') {
            continue;
        }
        
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td><span class="atributo">Nombre:</span> ${usuarios[i].nombre}</td>
            <td><span class="atributo">Email:</span> ${usuarios[i].email}</td>
            <td><span class="atributo">Estado:</span> ${usuarios[i].estado}</td>
            <td>
                <div class="botones">
                    <span class="atributo">Acciones:</span>
                    <button class="aprobar" data-nombre="${usuarios[i].nombre}">${usuarios[i].estado === 'Aprobado' ? 'Poner en espera' : 'Aprobar'}</button>
                    <button class="suspender" data-nombre="${usuarios[i].nombre}">Suspender</button>
                </div>
            </td>`
        tbody.appendChild(tr)
    }
}



  
  window.addEventListener('load', function() {
    cargarUsuarios()
  })
  
  document.querySelector('#tabla-usuarios').addEventListener('click', function(event) {
    if (event.target.classList.contains('aprobar')) {
        let nombre = event.target.getAttribute('data-nombre')
        let nuevoEstado = event.target.textContent === 'Aprobar' ? 'Aprobado' : 'En espera'
        cambiarEstadoUsuario(nombre, nuevoEstado)
        cargarUsuarios()
    } else if (event.target.classList.contains('suspender')) {
        let nombre = event.target.getAttribute('data-nombre')
        cambiarEstadoUsuario(nombre, 'suspendido')
        cargarUsuarios()
    }
})

