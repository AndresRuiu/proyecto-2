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

fetch('../catalogo.json')
.then(response => response.json())
    .then(data => {
      
      const tipo = data[7].tipo;
      const hd = data[7].hd;
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

  async function loadCatalog() {
    const response = await fetch('../catalogo.json');
    return await response.json();
  }
  
  function createYouTubeModal(youTubeUrl, movieId) {
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
    iframe.src = youTubeUrl;
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
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio[0];
      instance.querySelector(".duracion").textContent = pelicula.duracion + " min";
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
    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-2023");
    const fragment = document.createDocumentFragment();
  
    peliculas2023.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio;
      instance.querySelector(".duracion").textContent = pelicula.duracion + " min";
      instance.querySelector(".ranking").textContent = pelicula.ranking;
  
      // Agregar controlador de eventos al botón ver-mas
      const verMasButton = instance.querySelector('.ver-mas');
      verMasButton.addEventListener('click', () => {
        createYouTubeModal(pelicula.pagina, pelicula.id);
      });
  
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }
  
  
  
  async function cargarPeliculasAD() {
    const response = await fetch('../catalogo.json');
    const peliculas = await response.json();
    
    const peliculasAD = peliculas.filter(pelicula => pelicula.genero.includes("Accion") || pelicula.genero.includes("Drama"));
    
    const template = document.querySelector("#pelicula-card-template");
    const container = document.querySelector("#peliculas-container-AD");
  
    const fragment = document.createDocumentFragment();
  
    peliculasAD.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio;
      instance.querySelector(".duracion").textContent = pelicula.duracion + " min";
      instance.querySelector(".ranking").textContent = pelicula.ranking;

      const verMasButton = instance.querySelector('.ver-mas');
      verMasButton.addEventListener('click', () => {
        createYouTubeModal(pelicula.pagina, pelicula.id);
      });
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
}
  
  cargarPeliculasProximamente();
  cargarPeliculas2023()
  cargarPeliculasAD()
  
  

  const peliculasContainer2023 = document.querySelector('#peliculas-container-2023');
  const peliculasContainerAD = document.querySelector('#peliculas-container-AD');
  const scrollLeftButton = document.querySelector('#scroll-left');
  const scrollRightButton = document.querySelector('#scroll-right');
  
  scrollLeftButton.addEventListener('click', () => {
    peliculasContainer2023.scroll({
      left: peliculasContainer2023.scrollLeft - peliculasContainer2023.offsetWidth,
      behavior: 'smooth'
    });
    peliculasContainerAD.scroll({
      left: peliculasContainerAD.scrollLeft - peliculasContainerAD.offsetWidth,
      behavior: 'smooth'
    });
  });
  
  scrollRightButton.addEventListener('click', () => {
    peliculasContainer2023.scroll({
      left: peliculasContainer2023.scrollLeft + peliculasContainer2023.offsetWidth,
      behavior: 'smooth'
    });
    peliculasContainerAD.scroll({
      left: peliculasContainerAD.scrollLeft + peliculasContainerAD.offsetWidth,
      behavior: 'smooth'
    });
  });
  

  