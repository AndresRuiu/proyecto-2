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

  async function cargarPeliculas() {
    const response = await fetch('catalogo.json');
    const peliculas = await response.json();
    
    const peliculasEstreno = peliculas.filter(pelicula => pelicula.anio.includes("proximamente"));
    
    const template = document.querySelector("#pelicula-template-proximamente");
    const container = document.querySelector("#peliculas-container-proximamente");
  
    const fragment = document.createDocumentFragment();
  
    peliculasEstreno.forEach(pelicula => {
      const instance = template.content.cloneNode(true);
      
      instance.querySelector(".poster").src = pelicula.poster;
      instance.querySelector(".nombre").textContent = pelicula.nombre;
      instance.querySelector(".anio").textContent = pelicula.anio[0];
      instance.querySelector(".duracion").textContent = pelicula.duracion;
      instance.querySelector(".ranking").textContent = pelicula.ranking;
      instance.querySelector(".hd").textContent = "HD"
      
      fragment.appendChild(instance);
    });
  
    container.appendChild(fragment);
  }
  
  cargarPeliculas();
  
  
  

  