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

  async function cargarPeliculasProximamente() {
    const response = await fetch('catalogo.json');
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
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }

  async function cargarPeliculas2023() {
    const response = await fetch('catalogo.json');
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
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }
  
  cargarPeliculasProximamente();
  cargarPeliculas2023()
  
  
  const peliculasContainer = document.querySelector('#peliculas-container-2023');
const scrollLeftButton = document.querySelector('#scroll-left');
const scrollRightButton = document.querySelector('#scroll-right');

scrollLeftButton.addEventListener('click', () => {
  peliculasContainer.scroll({
    left: peliculasContainer.scrollLeft - peliculasContainer.offsetWidth,
    behavior: 'smooth'
  });
});

scrollRightButton.addEventListener('click', () => {
  peliculasContainer.scroll({
    left: peliculasContainer.scrollLeft + peliculasContainer.offsetWidth,
    behavior: 'smooth'
  });
});

  