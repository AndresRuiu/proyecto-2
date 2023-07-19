const button = document.querySelector('.navbar-toggler');
button.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('expanded');
});


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
      window.location.href = "./administrador.html";
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
   window.location.href = '../index.html';
});

console.log(JSON.parse(localStorage.getItem("usuarioActual")));



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
  else if (event.target.tagName === 'A') {
    event.target.style.textDecoration = 'none';
    event.target.style.color = 'black';
}
});

searchButton.addEventListener('click', () => {
  searchModal.style.display = searchModal.style.display === 'none' ? 'block' : 'none';
  if (window.matchMedia("(max-width: 767px)").matches) {
    const navbar = document.querySelector('.navbar');
    navbar.appendChild(searchModal);
    searchModal.style.position = 'relative';
        searchModal.style.top = 'auto';
        searchModal.style.bottom = 'auto';
        searchModal.style.margin = '0 auto';

        resultsDiv.style.position = 'relative';
        resultsDiv.style.top = 'auto';
        resultsDiv.style.bottom = 'auto';
        resultsDiv.style.width = 'auto';
        resultsDiv.style.margin = '0 auto';
        
    } else {
        searchModal.style.position = 'absolute';
        searchModal.style.top = '50px';
        searchModal.style.bottom = 'auto';
        searchModal.style.width = 'auto';
}

});

searchInput.addEventListener('input', async (event) => {
  let searchValue = event.target.value;
  let results = await searchMovies(searchValue);

  resultsDiv.innerHTML = '';
  for (let movie of results.slice(0, 5)) {
    let movieElement = document.createElement('li');
    let movieLink = document.createElement('a');
    let youTubeUrl;
    if (Array.isArray(movie.pagina)) {
        if (movie.pagina.length === 1) {
            youTubeUrl = movie.pagina[0];
        } else if (movie.pagina.length > 1) {
            movieLink.href = movie.pagina[1];
        }
    } else {
        youTubeUrl = movie.pagina;
    }
    if (youTubeUrl) {
        movieLink.addEventListener('click', event => {
            event.preventDefault();
            createYouTubeModal(youTubeUrl);
        });
    }
    movieLink.textContent = movie.nombre;
    movieElement.appendChild(movieLink);
    movieElement.style.marginTop = '3px';
    resultsDiv.appendChild(movieElement);
}

});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
      resultsDiv.innerHTML = '';
  }, 100);
});


async function searchMovies(searchValue) {
  console.log('Buscando películas con valor:', searchValue);
  let response = await fetch('../catalogo.json');
  let movies = await response.json();

  let storedMovies = JSON.parse(localStorage.getItem('movies'));
  if (storedMovies) {
    storedMovies = storedMovies.map(movie => {
      return {
        nombre: movie.name,
        genero: movie.genre,
        pagina: movie.pagina
      };
    });
    movies = movies.concat(storedMovies);
  }
  console.log('Películas en localStorage:', storedMovies);

  let results = movies.filter(movie => {
    return typeof movie.nombre === 'string' && (movie.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.genero.toString().includes(searchValue.toLowerCase()));
  });  

  return results;
}

function createYouTubeModal(youTubeUrl) {
  const modalContainer = document.createElement('div');
  modalContainer.style.display = 'flex';
  modalContainer.style.justifyContent = 'center';
  modalContainer.style.alignItems = 'center';
  modalContainer.style.position = 'fixed';
  modalContainer.style.top = '0';
  modalContainer.style.left = '0';
  modalContainer.style.width = '100%';
  modalContainer.style.height = '100%';
  modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modalContainer.style.backdropFilter = 'blur(10px)';
  modalContainer.style.zIndex = '9999';

  const videoContainer = document.createElement('div');
  videoContainer.id = 'modal';
  
  modalContainer.addEventListener('click', event => {
    if (event.target === modalContainer) {
      document.body.removeChild(modalContainer);
      if (pageContainer) {
        pageContainer.style.filter = '';
      }
    }
  });

  const iframe = document.createElement('iframe');
  iframe.width = '560';
  iframe.height = '315';
  iframe.src = youTubeUrl + "?autoplay=1";
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;

  
  const movieIdElement = document.createElement('div');
  
  videoContainer.appendChild(iframe);
  videoContainer.appendChild(movieIdElement);
  
  modalContainer.appendChild(videoContainer);
  
  document.body.appendChild(modalContainer);
}


function ordenarPeliculas(peliculas, orden) {
  peliculas.sort(function (a, b) {
    try {
      const nombreA = typeof a.nombre === 'string' ? a.nombre.toLowerCase() : '';
      const nombreB = typeof b.nombre === 'string' ? b.nombre.toLowerCase() : '';
      const comparacion = nombreA.toLowerCase()
        .localeCompare(nombreB.toLowerCase());
      if (orden === "A-Z") {
        return comparacion;
      }
      if (orden === "Z-A") {
        return -comparacion;
      }
    } catch (error) {
      console.error(error);
    }
  });  
  return peliculas;
}

function mostrarPeliculas(peliculas) {
  const template = document.querySelector("#pelicula-card-template");
  const container = document.querySelector("#todo-peliculas");
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  peliculas.forEach((pelicula) => {
    const instance = template.content.cloneNode(true);
    if (pelicula.poster) {
      instance.querySelector(".poster").src = pelicula.poster[0];
    } else if (pelicula.file) {
      const fileUrl = URL.createObjectURL(pelicula.file);
      instance.querySelector(".poster").src = fileUrl;
    }
    instance.querySelector(".descripcion").textContent =
      pelicula.descripcion ? pelicula.descripcion[0] : pelicula.description;
    instance.querySelector(".nombre").textContent = pelicula.nombre;
    if (Array.isArray(pelicula.anio)) {
      instance.querySelector(".anio").textContent = pelicula.anio[0];
    } else {
      instance.querySelector(".anio").textContent = pelicula.anio;
    }
    instance.querySelector(".duracion").textContent = pelicula.duracion;
    instance.querySelector(".ranking").textContent = pelicula.ranking;

    const verMasButton = instance.querySelector(".ver-mas");
    verMasButton.addEventListener("click", () => {
      if (Array.isArray(pelicula.pagina) && pelicula.pagina.length === 2) {
        window.open(pelicula.pagina[1], "_self");
      } else {
        createYouTubeModal(pelicula.pagina);
      }
    });
    fragment.appendChild(instance);
  });
  container.appendChild(fragment);
}

async function cargarPeliculas() {
  const response = await fetch("../catalogo.json");
  const peliculasJson = await response.json();

  const peliculasLocalStorage =
    JSON.parse(localStorage.getItem("movies")) || [];
  peliculasLocalStorage.forEach((pelicula) => {
    if (pelicula.file) {
      const byteString = atob(pelicula.file.split(",")[1]);
      const mimeString = pelicula.file.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      pelicula.file = new Blob([arrayBuffer], { type: mimeString });
    }
  });

  const peliculas = peliculasJson.concat(peliculasLocalStorage);

  const todoPeliculas = peliculas.filter((pelicula) =>
    pelicula.tipo.includes("Pelicula")
  );

  todoPeliculas.sort(() => Math.random() - 0.5);

  return todoPeliculas;
}

async function mainPeliculas() {
  const selectOrdenar = document.querySelector("#ordenar-peliculas");
  const peliculas = await cargarPeliculas();
  mostrarPeliculas(peliculas);
  selectOrdenar.addEventListener("change", function () {
    const orden = selectOrdenar.value;
    if (orden === "Aleatorio") {
      peliculas.sort(() => Math.random() - 0.5);
    } else {
      ordenarPeliculas(peliculas, orden);
    }
    mostrarPeliculas(peliculas);
  });
}

mainPeliculas();

