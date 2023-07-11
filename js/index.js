let aside = document.querySelector('#videoAside');
let video = document.querySelector('video');
let muteIcon = document.querySelector('#muteIcon');
let unmuteIcon = document.querySelector('#unmuteIcon');
aside.addEventListener('click', function () {
    if (video.muted) {
        video.muted = false;
        muteIcon.style.display = 'none';
        unmuteIcon.style.display = 'block';
    } else {
        video.muted = true;
        muteIcon.style.display = 'block';
        unmuteIcon.style.display = 'none';
    }
    setTimeout(function () {
        muteIcon.style.display = 'none';
        unmuteIcon.style.display = 'none';
    }, 2000);
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
      
      const tipo = data[7].tipo;
      const genero = data[7].genero.join(', ');
      const anio = data[7].anio;

      const tipoBtn = document.querySelector('.tipo');
      tipoBtn.textContent = tipo;

      const hdBtn = document.querySelector('.hd');
      hdBtn.textContent = `HD`;

      const generoP = document.querySelector('.genero');
      generoP.textContent = `${genero}`;

      const anioSpan = document.querySelector('.anio p');
      anioSpan.textContent = anio;

  })
  .catch(error => console.error(error));


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
  

  async function cargarPeliculasProximamente() {
    const response = await fetch('../catalogo.json');
    const peliculas = await response.json();
    
    const peliculasProximamente = peliculas.filter(pelicula => pelicula.anio.includes("proximamente"));
    
    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-proximamente");
  
    const fragment = document.createDocumentFragment();
  
    peliculasProximamente.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".descripcion").textContent = pelicula.descripcion;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio[0];
      instance.querySelector(".duracion").textContent = pelicula.duracion;
      instance.querySelector(".ranking").textContent = pelicula.ranking;
      
      const verMasButton = instance.querySelector('.ver-mas');
      verMasButton.addEventListener('click', () => {
        createYouTubeModal(pelicula.pagina, pelicula.id);
      });
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }

  async function cargarPeliculas2023() {
    const response = await fetch('../catalogo.json');
    const peliculas = await response.json();
    const peliculas2023 = peliculas.filter(pelicula => pelicula.anio == "2023" && !pelicula.anio.includes("proximamente"));
   
    peliculas2023.sort(() => Math.random() - 0.5);

    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-2023");
    
    const fragment = document.createDocumentFragment();
  
    peliculas2023.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".descripcion").textContent = pelicula.descripcion;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio;
      instance.querySelector(".duracion").textContent = pelicula.duracion;
      instance.querySelector(".ranking").textContent = pelicula.ranking;
  
      const verMasButton = instance.querySelector('.ver-mas');
      verMasButton.addEventListener('click', () => {
        createYouTubeModal(pelicula.pagina);
      });
  
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }
  
  function cargarPeliculasDestacadas() {
    const peliculas = JSON.parse(localStorage.getItem('movies')) || [];
    peliculas.forEach(pelicula => {
        if (pelicula.file) {
            const byteString = atob(pelicula.file.split(',')[1]);
            const mimeString = pelicula.file.split(',')[0].split(':')[1].split(';')[0];
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            pelicula.file = new Blob([arrayBuffer], { type: mimeString });
        }
    });

    const peliculasDestacadas = peliculas.filter(pelicula => pelicula.featured && pelicula.published);
    peliculasDestacadas.sort(() => Math.random() - 0.5);

    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-destacados");
    const fragment = document.createDocumentFragment();

    peliculasDestacadas.forEach(pelicula => {
        const instance = template.content.cloneNode(true);
        if (pelicula.file) {
            const fileUrl = URL.createObjectURL(pelicula.file);
            instance.querySelector(".poster").src = fileUrl;
        }
        instance.querySelector(".nombre").textContent = pelicula.name;
        instance.querySelector(".descripcion").textContent = pelicula.description;
        instance.querySelector(".anio").textContent = pelicula.anio;
        instance.querySelector(".duracion").textContent = pelicula.duracion;
        instance.querySelector(".ranking").textContent = pelicula.ranking;

        const verMasButton = instance.querySelector('.ver-mas');
        verMasButton.addEventListener('click', () => {
            createYouTubeModal(pelicula.pagina);
        });

        fragment.appendChild(instance);
    });

    container.appendChild(fragment);
}
  
  async function cargarPeliculasAD() {
    const response = await fetch('../catalogo.json');
    const peliculas = await response.json();
    
    const peliculasAD = peliculas.filter(pelicula => (pelicula.genero.includes("Accion") || pelicula.genero.includes("Drama")) && !pelicula.anio.includes("proximamente"));
    
    peliculasAD.sort(() => Math.random() - 0.5);

    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-AD");
  
    const fragment = document.createDocumentFragment();
  
    peliculasAD.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".descripcion").textContent = pelicula.descripcion;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio;
      instance.querySelector(".duracion").textContent = pelicula.duracion;
      instance.querySelector(".ranking").textContent = pelicula.ranking;

      const verMasButton = instance.querySelector('.ver-mas');
      verMasButton.addEventListener('click', () => {
        createYouTubeModal(pelicula.pagina);
      });
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
}

async function cargarPeliculasTerror() {
  const response = await fetch('../catalogo.json');
  const peliculas = await response.json();
  
  const peliculasTerror = peliculas.filter(pelicula => (pelicula.genero.includes("Terror") || pelicula.genero.includes("Suspenso")) && !pelicula.anio.includes("proximamente"));
  
  peliculasTerror.sort(() => Math.random() - 0.5);

  const template = document.querySelector("#pelicula-card-template");
  const container = document.querySelector("#peliculas-container-Terror");

  const fragment = document.createDocumentFragment();

  peliculasTerror.forEach(pelicula => {
    const instance = template.content.cloneNode(true);
    
    instance.querySelector(".poster").src = pelicula.poster;
    instance.querySelector(".descripcion").textContent = pelicula.descripcion;
    instance.querySelector(".nombre").textContent = pelicula.nombre;
    instance.querySelector(".anio").textContent = pelicula.anio;
    instance.querySelector(".duracion").textContent = pelicula.duracion;
    instance.querySelector(".ranking").textContent = pelicula.ranking;

    const verMasButton = instance.querySelector('.ver-mas');
    verMasButton.addEventListener('click', () => {
      createYouTubeModal(pelicula.pagina);
    });
    
    fragment.appendChild(instance);
  });

  container.appendChild(fragment);
}

async function cargarPeliculasCrimen() {
  const response = await fetch('../catalogo.json');
  const peliculas = await response.json();
  
  const peliculasCrimen = peliculas.filter(pelicula => pelicula.genero.includes("Crimen") && !pelicula.anio.includes("proximamente"));
  
  peliculasCrimen.sort(() => Math.random() - 0.5);

  const template = document.querySelector("#pelicula-card-template");
  const container = document.querySelector("#peliculas-container-Crimen");

  const fragment = document.createDocumentFragment();

  peliculasCrimen.forEach(pelicula => {
    const instance = template.content.cloneNode(true);
    
    instance.querySelector(".poster").src = pelicula.poster;
    instance.querySelector(".descripcion").textContent = pelicula.descripcion;
    instance.querySelector(".nombre").textContent = pelicula.nombre;
    instance.querySelector(".anio").textContent = pelicula.anio;
    instance.querySelector(".duracion").textContent = pelicula.duracion;
    instance.querySelector(".ranking").textContent = pelicula.ranking;

    const verMasButton = instance.querySelector('.ver-mas');
    verMasButton.addEventListener('click', () => {
      createYouTubeModal(pelicula.pagina);
    });
    
    fragment.appendChild(instance);
  });

  container.appendChild(fragment);
}

async function cargarPeliculasCR() {
  const response = await fetch('../catalogo.json');
  const peliculas = await response.json();
  
  let peliculasCR = peliculas.filter(pelicula => (pelicula.genero.includes("Comedia") || pelicula.genero.includes("Romance")) && !pelicula.anio.includes("proximamente"));
  
  peliculasCR.sort(() => Math.random() - 0.5);
  
  const template = document.querySelector("#pelicula-card-template");
  const container = document.querySelector("#peliculas-container-CR");

  const fragment = document.createDocumentFragment();

  peliculasCR.forEach(pelicula => {
    const instance = template.content.cloneNode(true);
    
    instance.querySelector(".poster").src = pelicula.poster;
    instance.querySelector(".descripcion").textContent = pelicula.descripcion;
    instance.querySelector(".nombre").textContent = pelicula.nombre;
    instance.querySelector(".anio").textContent = pelicula.anio;
    instance.querySelector(".duracion").textContent = pelicula.duracion;
    instance.querySelector(".ranking").textContent = pelicula.ranking;

    const verMasButton = instance.querySelector('.ver-mas');
    verMasButton.addEventListener('click', () => {
      createYouTubeModal(pelicula.pagina);
    });
    
    fragment.appendChild(instance);
  });

  container.appendChild(fragment);
}


  

const peliculasContainer2023 = document.getElementById("peliculas-container-2023");
const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");

const peliculasContainerAD = document.getElementById("peliculas-container-AD");
const scrollLeft1 = document.getElementById("scroll-left1");
const scrollRight1 = document.getElementById("scroll-right1");

const peliculasContainerTerror= document.getElementById("peliculas-container-Terror");
const scrollLeft2 = document.getElementById("scroll-left2");
const scrollRight2 = document.getElementById("scroll-right2");

const peliculasContainerCrimen= document.getElementById("peliculas-container-Crimen");
const scrollLeft3 = document.getElementById("scroll-left3");
const scrollRight3 = document.getElementById("scroll-right3");

const peliculasContainerCR= document.getElementById("peliculas-container-CR");
const scrollLeft4 = document.getElementById("scroll-left4");
const scrollRight4 = document.getElementById("scroll-right4");

const peliculasContainerD= document.getElementById("peliculas-container-destacados");
const scrollLeft5 = document.getElementById("scroll-left5");
const scrollRight5 = document.getElementById("scroll-right5");


scrollLeft.addEventListener("click", () => {
  peliculasContainer2023.scroll({
    left: peliculasContainer2023.scrollLeft - peliculasContainer2023.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight.addEventListener("click", () => {
  peliculasContainer2023.scroll({
    left: peliculasContainer2023.scrollLeft + peliculasContainer2023.offsetWidth,
    behavior: "smooth",
  });
});

scrollLeft1.addEventListener("click", () => {
  peliculasContainerAD.scroll({
    left: peliculasContainerAD.scrollLeft - peliculasContainerAD.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight1.addEventListener("click", () => {
  peliculasContainerAD.scroll({
    left: peliculasContainerAD.scrollLeft + peliculasContainerAD.offsetWidth,
    behavior: "smooth",
  });
});

scrollLeft2.addEventListener("click", () => {
  peliculasContainerTerror.scroll({
    left: peliculasContainerTerror.scrollLeft - peliculasContainerTerror.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight2.addEventListener("click", () => {
  peliculasContainerTerror.scroll({
    left:peliculasContainerTerror.scrollLeft +peliculasContainerTerror.offsetWidth,
    behavior: "smooth",
  });
});

scrollLeft3.addEventListener("click", () => {
  peliculasContainerCrimen.scroll({
    left: peliculasContainerCrimen.scrollLeft - peliculasContainerCrimen.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight3.addEventListener("click", () => {
  peliculasContainerCrimen.scroll({
    left:peliculasContainerCrimen.scrollLeft +peliculasContainerCrimen.offsetWidth,
    behavior: "smooth",
  });
});

scrollLeft4.addEventListener("click", () => {
  peliculasContainerCR.scroll({
    left: peliculasContainerCR.scrollLeft - peliculasContainerCR.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight4.addEventListener("click", () => {
  peliculasContainerCR.scroll({
    left:peliculasContainerCR.scrollLeft +peliculasContainerCR.offsetWidth,
    behavior: "smooth",
  });
});

scrollLeft5.addEventListener("click", () => {
  peliculasContainerD.scroll({
    left: peliculasContainerD.scrollLeft - peliculasContainerD.offsetWidth,
    behavior: "smooth",
  });
});

scrollRight5.addEventListener("click", () => {
  peliculasContainerD.scroll({
    left:peliculasContainerD.scrollLeft +peliculasContainerD.offsetWidth,
    behavior: "smooth",
  });
});



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

  // Eliminar el icono existente si existe
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






cargarPeliculasProximamente();
cargarPeliculas2023()
cargarPeliculasAD()
cargarPeliculasTerror()
cargarPeliculasCrimen()
cargarPeliculasCR()
cargarPeliculasDestacadas()



