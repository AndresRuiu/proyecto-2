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

const tableBody = document.querySelector('#table-body');
const addMovieBtn = document.querySelector('#add-movie-btn');
const modal = new bootstrap.Modal(document.querySelector('#modal'), {
  backdrop: 'static',
  keyboard: false
});
const modalTitle = document.querySelector('#modal-title');
const movieCodeInput = document.querySelector('#movie-code');
const movieNameInput = document.querySelector('#movie-name');
const movieGenreInput = document.querySelector('#movie-genre');
const movieDescriptionInput = document.querySelector('#movie-description');
const moviePosterInput = document.querySelector('#movie-poster');
const movieAnioInput = document.querySelector('#movie-anio');
const movieDuracionInput = document.querySelector('#movie-duracion');
const movieRankingInput = document.querySelector('#movie-ranking');
const moviePaginaInput = document.querySelector('#movie-pagina');
const moviePublishedInput = document.querySelector('#movie-published');
const movieFeaturedInput = document.querySelector('#movie-featured');
const saveMovieBtn = document.querySelector('#save-movie-btn');
const fileInput = document.querySelector('#fileInput');
const fileNameLabel = document.querySelector('#fileNameLabel');
const removeFileButton = document.querySelector('#removeFileButton');

function renderTable() {
  tableBody.innerHTML = '';
  movies.forEach((movie, index) => {
    const tr = document.createElement('tr');

    const codeTd = document.createElement('td');
    codeTd.textContent = movie.code;
    tr.appendChild(codeTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = movie.name;
    tr.appendChild(nameTd);

    const genreTd = document.createElement('td');
    genreTd.textContent = movie.genre;
    tr.appendChild(genreTd);

    const descriptionTd = document.createElement('td');
    descriptionTd.textContent = movie.description;
    tr.appendChild(descriptionTd);

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

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
    currentMovie = index;
    openModal('Editar película', movie);
    });
    tr.appendChild(editBtn);


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.addEventListener('click', () => {
      if (confirm(`¿Estás seguro de que quieres eliminar la película "${movie.name}"?`)) {
        movies.splice(index, 1);
        saveMovies();
        renderTable();
      }
    });
    tr.appendChild(deleteBtn);

    tableBody.appendChild(tr);
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
    movieNameInput.value = movie.name;
    movieGenreInput.value = movie.genre;
    movieDescriptionInput.value = movie.description;
    moviePublishedInput.checked = movie.published;
    movieFeaturedInput.checked = movie.featured;
    movieAnioInput.value = movie.anio;
    movieDuracionInput.value = movie.duracion;
    movieRankingInput.value = movie.ranking;
    moviePaginaInput.value = movie.pagina;
  } else {
    movieCodeInput.value = getNextCode();
    movieCodeInput.parentElement.classList.add('hidden');
    movieNameInput.value = '';
    movieGenreInput.value = '';
    movieDescriptionInput.value = '';
    moviePublishedInput.checked = false;
    movieFeaturedInput.checked = false;
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
  const name = movieNameInput.value;
  const genre = movieGenreInput.value;
  const description = movieDescriptionInput.value;
  const published = moviePublishedInput.checked;
  const featured = movieFeaturedInput.checked;
  const file = fileInput.files[0];
  const anio = movieAnioInput.value;
  const duracion = movieDuracionInput.value;
  const ranking = movieRankingInput.value;
  const pagina = moviePaginaInput.value;

  // Convertir el archivo a una cadena en formato base64
  if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          const base64File = reader.result;

          if (currentMovie !== null) {
              movies[currentMovie] = { code, name, genre, description, published, featured, file: base64File, anio, duracion, ranking, pagina };
          } else {
              movies.push({ code, name, genre, description, published, featured, file: base64File, anio, duracion, ranking, pagina });
          }

          saveMovies();
          renderTable();
          modal.hide();
      };
  } else {
      if (currentMovie !== null) {
          movies[currentMovie] = { code, name, genre, description, published, featured, file: null, anio, duracion, ranking, pagina };
      } else {
          movies.push({ code, name, genre, description, published, featured, file: null, anio, duracion, ranking, pagina });
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





 