function cambiarBoton() {
  var botonIngresar = document.getElementById("ingresar");
  var botonCerrarSesion = document.getElementById("cerrar-sesion");

  var nombreUsuario = localStorage.getItem("usuarioActual");

  var tipo;
  if (nombreUsuario == "admin") {
    tipo = "admin";
  } else if (nombreUsuario) {
    tipo = "user";
  } else {
    tipo = "none";
  }

  var iconoExistente = document.querySelector(".uil-user-plus, .uil-user");
  if (iconoExistente) {
    iconoExistente.remove();
  }

  if (tipo == "admin") {
    botonIngresar.style.display = "none";
    botonCerrarSesion.style.display = "inline-block";

    var icono = document.createElement("i");
    icono.className = "uil uil-user-plus";
    botonCerrarSesion.parentNode.insertBefore(icono, botonCerrarSesion.nextSibling);
    icono.style.color = "#d40f45";
    icono.style.border = "1px solid white";
    icono.style.borderRadius = "50%";
    icono.style.padding = "6px";

    icono.addEventListener("click", function() {
      window.location.href = "./pages/administrador.html";
    });
  } else if (tipo == "user") {
    botonIngresar.style.display = "none";
    botonCerrarSesion.style.display = "inline-block";

    var icono = document.createElement("i");
    icono.className = "uil uil-user";
    botonCerrarSesion.parentNode.insertBefore(icono, botonCerrarSesion.nextSibling);
    icono.style.color = "#d40f45";
    icono.style.border = "1px solid white";
    icono.style.borderRadius = "50%";
    icono.style.padding = "6px";

  } else {
    botonIngresar.style.display = "inline-block";
    botonCerrarSesion.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  cambiarBoton();
});

document.getElementById("cerrar-sesion").addEventListener("click", function() {
   localStorage.removeItem("usuarioActual");
   cambiarBoton();
   location.reload();
});

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
});

const searchButton = document.querySelector('.search');
const searchModal = document.createElement('div');
searchModal.style.position = 'absolute';
searchModal.style.top = '50px';
searchModal.style.right = '50px';
searchModal.style.border = '1px solid black';
searchModal.style.padding = '10px';
searchModal.style.backgroundColor = 'white';
searchModal.style.zIndex = '9999';
searchModal.style.border = '2px solid #d40f45';
searchModal.style.marginTop = '5px';

const searchInput = document.createElement('input');
const resultsDiv = document.createElement('div');

searchModal.style.display = 'none';
searchModal.style.borderRadius = '5px';
searchModal.appendChild(searchInput);
searchModal.appendChild(resultsDiv);
document.body.appendChild(searchModal);
resultsDiv.style.listStyle = 'none';
resultsDiv.style.paddingLeft = '10px';
resultsDiv.style.borderRadius = '5px';

resultsDiv.addEventListener('DOMNodeInserted', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.borderBottom = '1px solid #d40f45';
  }
});

searchButton.addEventListener('click', () => {
  searchModal.style.display = searchModal.style.display === 'none' ? 'block' : 'none';
});

searchInput.addEventListener('input', async (event) => {
  let searchValue = event.target.value;
  let results = await searchMovies(searchValue);

  resultsDiv.innerHTML = '';
  for (let movie of results.slice(0, 5)) {
    let movieElement = document.createElement('li');
    movieElement.textContent = movie.nombre;
    movieElement.style.marginTop = '3px';
    resultsDiv.appendChild(movieElement);
  }  
});

searchInput.addEventListener('blur', () => {
  resultsDiv.innerHTML = '';
});


async function searchMovies(searchValue) {
  console.log('Buscando películas con valor:', searchValue);
  let response = await fetch('./catalogo.json');
  let movies = await response.json();

  let storedMovies = JSON.parse(localStorage.getItem('movies'));
  if (storedMovies) {
    storedMovies = storedMovies.map(movie => {
      return {
        nombre: movie.name,
        genero: movie.genre
      };
    });
    movies = movies.concat(storedMovies);
  }
  console.log('Películas en localStorage:', storedMovies);

  let results = movies.filter(movie => {
    return movie.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.genero.toString().includes(searchValue.toLowerCase());
  });

  return results;
}


fetch('../catalogo.json')
.then(response => response.json())
    .then(data => {
      
      const tipo = data[3].tipo;
      const genero = data[3].genero.join(', ');
      const anio = data[3].anio;
      const pagina = data[3].pagina[0]
      const nombre = data[3].nombre

      const nombreBtn = document.querySelector('#nombre');
      nombreBtn.textContent = nombre;

      const tipoBtn = document.querySelector('.tipo');
      tipoBtn.textContent = tipo;

      const hdBtn = document.querySelector('.hd');
      hdBtn.textContent = `4K`;

      const generoP = document.querySelector('.genero');
      generoP.textContent = `${genero}`;

      const anioSpan = document.querySelector('.anio p');
      anioSpan.textContent = anio;

      const playButton = document.querySelector('#play');
      playButton.addEventListener('click', () => {
      window.open(pagina, '_blank');
      });

      const posterImage = document.querySelector('#poster-imagen');
      posterImage.setAttribute('src', data[3].poster[1]);

      const descriptionElement = document.querySelector('#descripcion');
      descriptionElement.textContent = data[3].descripcion[1];

  })
  .catch(error => console.error(error));

const informacionDiv2 = document.getElementById("informacion2");
const data2 = [
  {
    "nombre": "Avatar: El sentido del agua",
    "anio": ["2023"],
    "direccion": ["James Cameron"],
    "tipo": "Pelicula",
    "genero": ["Accion","Aventura","Fantasia"],
    "reparto": ["Sam Worthington", "Zoe Saldana","Sigourney Weaver"],
    "descripcion":"Jake Sully vive con su nueva familia en el planeta de Pandora. Cuando una amenaza conocida regresa, Jake debe trabajar con Neytiri y el ejército de la raza na'vi para proteger su planeta.",
    "ranking":"7,6",
    "duracion":"192"
  },
];


function llenarInformacion(index) {
  const elemento = data2[index];
  informacionDiv2.innerHTML = `
  <div class="nombre"><h4>${elemento.nombre}</h4></div>
    <div class="anio">
      <i class="fa-solid fa-calendar-days" style="color: #d40f45;"></i>
      <span>${Array.isArray(elemento.anio) ? elemento.anio.join(", ") : elemento.anio}</span>
    </div>
    <div class="direccion"><span>Dirección: ${elemento.direccion.join(', ')}</span></div>      
    <div class="reparto"><span>Reparto: ${elemento.reparto.join(', ')}</span></div>
    <div class="ranking"><span>Puntaje: ${elemento.ranking}/10</span></div>
    <div class="duracion"><span>Duracion: ${elemento.duracion} minutos</span></div>
  `;
}

llenarInformacion(0); 

