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

let movies = JSON.parse(localStorage.getItem('movies')) || [];
let currentMovie = null;

const tipo = "";

const tableBody = document.querySelector('#table-body');
const addMovieBtn = document.querySelector('#add-movie-btn');
const modal = new bootstrap.Modal(document.querySelector('#modal'), {
  backdrop: 'static',
  keyboard: false
});
const modalTitle = document.querySelector('#modal-title');
const movieCodeInput = document.querySelector('#movie-code');
const movieNameInput = document.querySelector('#movie-name');
var select = document.getElementById('movie-genre-input');
var selectedGenres = [];
select.addEventListener('change', () => {
  selectedGenres = [];
  for (var i = 0; i < select.options.length; i++) {
    var option = select.options[i];
    if (option.selected) {
      selectedGenres.push(option.value);
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  }
});



const movieDescriptionInput = document.querySelector('#movie-description');
const moviePosterInput = document.querySelector('#movie-poster');
const movieAnioInput = document.querySelector('#movie-anio');
const movieDuracionInput = document.querySelector('#movie-duracion');
const movieRankingInput = document.querySelector('#movie-ranking');
const moviePaginaInput = document.querySelector('#movie-pagina');
const moviePublishedInput = document.querySelector('#movie-published');
const movieFeaturedInput = document.querySelector('#movie-featured');
const movieTipoSelect = document.querySelector('#movie-tipo-select');
const saveMovieBtn = document.querySelector('#save-movie-btn');
const fileInput = document.querySelector('#fileInput');
const fileNameLabel = document.querySelector('#fileNameLabel');
const removeFileButton = document.querySelector('#removeFileButton');


function renderTable() {
  var tableBody = document.getElementById('tableBody');
  if (tableBody) { 
    tableBody.innerHTML = '';
  } else {
    console.log("tableBody es null");
  }
  
  movies.forEach((movie, index) => {
    const tr = document.createElement('tr');

    const codeTd = document.createElement('td');
    codeTd.textContent = movie.code;
    tr.appendChild(codeTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = movie.nombre;
    tr.appendChild(nameTd);

    const genreTd = document.createElement('td');
    genreTd.textContent = movie.genre;
    tr.appendChild(genreTd);

    const publishedTd = document.createElement('td');
    const publishedCheckbox = document.createElement('input');
    publishedCheckbox.type = 'checkbox';
    publishedCheckbox.checked = movie.published;
    publishedCheckbox.disabled = true;
    publishedTd.appendChild(publishedCheckbox);
    tr.appendChild(publishedTd);

    const featuredTd = document.createElement('td');
    const featuredCheckbox = document.createElement('input');
    featuredCheckbox.type = 'checkbox';
    featuredCheckbox.checked = movie.featured;
    featuredCheckbox.disabled = true;
    featuredTd.appendChild(featuredCheckbox);
    tr.appendChild(featuredTd);

    const typeTd = document.createElement('td');
    typeTd.textContent = movie.tipo;
    tr.appendChild(typeTd);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('btn', 'btn-primary', 'm-2');
    editBtn.addEventListener('click', () => {
      currentMovie = index;
      openModal('Editar película', movie);
    });
    tr.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.addEventListener('click', () => {
      if (confirm(`¿Estás seguro de que quieres eliminar la película "${movie.nombre}"?`)) {
        movies.splice(index, 1);
        saveMovies();
        renderTable();
      }
    });
    tr.appendChild(deleteBtn);
    tableBody.appendChild(tr);

    const descriptionTr = document.createElement('tr');
    const descriptionTd = document.createElement('td'); 

    descriptionTd.setAttribute('colspan', '9');

    descriptionTd.textContent = movie.description;
    descriptionTr.appendChild(descriptionTd); 
    tableBody.appendChild(descriptionTr); 
  });
}

function getNextCode() {
  let maxCode = 0;
  movies.forEach(movie => {
    const code = parseInt(movie.code);
    if (code > maxCode) {
      maxCode = code;
    }
  });
  return String(maxCode + 1).padStart(3, '0');
}

function openModal(title, movie) {
  modalTitle.textContent = title;

  if (movie) {
    movieCodeInput.value = movie.code;
    movieNameInput.value = movie.nombre;
    movie.genre = selectedGenres;
    var select = document.getElementById("movie-genre-input"); 
    var options = select.options; 
    var size = options.length; 
    select.size = size;
    movieDescriptionInput.value = movie.description;
    moviePublishedInput.checked = movie.published;
    movieFeaturedInput.checked = movie.featured;
    movieAnioInput.value = movie.anio;
    movieDuracionInput.value = movie.duracion;
    movieRankingInput.value = movie.ranking;
    moviePaginaInput.value = movie.pagina;
    movieTipoSelect.value = movie.tipo;
  } else {
    movieCodeInput.value = "";
    movieNameInput.value = "";
    movieDescriptionInput.value = "";
    moviePublishedInput.checked = false;
    movieFeaturedInput.checked = false;
    movieAnioInput.value = "";
    movieDuracionInput.value = "";
    movieRankingInput.value = "";
    moviePaginaInput.value = "";
    movieTipoSelect.value = "";
  }
  modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.querySelector('#fileInput');
  const fileNameLabel = document.querySelector('#fileNameLabel');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      fileNameLabel.textContent = file.name;
    } else {
      fileNameLabel.textContent = '';
    }
  });
});

removeFileButton.addEventListener('click', () => {
  fileInput.value = '';
  fileNameLabel.textContent = '';
  localStorage.removeItem('selectedFile');
});

function saveMovies() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

addMovieBtn.addEventListener('click', () => {
  currentMovie = null;
  openModal('Agregar película');
});

saveMovieBtn.addEventListener('click', () => {
  const code = movieCodeInput.value;
  const nombre = movieNameInput.value;
  const genre = selectedGenres;
  const description = movieDescriptionInput.value;
  const published = moviePublishedInput.checked;
  const featured = movieFeaturedInput.checked;
  const file = fileInput.files[0];
  const anio = movieAnioInput.value;
  const duracion = movieDuracionInput.value;
  const ranking = movieRankingInput.value;
  const pagina = moviePaginaInput.value;
  const tipo = movieTipoSelect.value;

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64File = reader.result;

      if (currentMovie !== null) {
        movies[currentMovie] = { code, nombre, genre, description, published, featured, file: base64File, anio, duracion, ranking, pagina, tipo }; // Include tipo in the movie object
      } else {
        movies.push({ code, nombre, genre, description, published, featured, file: base64File, anio, duracion, ranking, pagina, tipo }); // Include tipo in the movie object
      }

      saveMovies();
      renderTable();
      modal.hide();
    };
  } else {
    if (currentMovie !== null) {
      movies[currentMovie] = { code, nombre, genre, description, published, featured, file: null, anio, duracion, ranking, pagina, tipo }; // Include tipo in the movie object
    } else {
      movies.push({ code, nombre, genre, description, published, featured, file: null, anio, duracion, ranking, pagina, tipo }); // Include tipo in the movie object
    }

    saveMovies();
    renderTable();
    modal.hide();
  }
});


document.querySelector('#cancel-movie-btn').addEventListener('click', () => {
  modal.hide();
});

renderTable();





 