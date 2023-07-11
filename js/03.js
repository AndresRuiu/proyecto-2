
const informacionDiv = document.getElementById("informacion");
const data = [
  {
    "tipo": "Película",
    "hd": "4K",
    "genero": ["Animacion","Accion","Aventura"],
    "anio": ["2023"],
  },
];

const informacionDiv2 = document.getElementById("informacion2");
const data2 = [
  {
    "nombre": "Spider-Man: Cruzando el multiverso",
    "anio": ["2023"],
    "direccion": ["Joaquim Dos Santos", "Kemp Powers", "Justin K. Thompson"],
    "tipo": "Pelicula",
    "genero": ["Animacion","Accion","Aventura"],
    "reparto": ["Shameik Moore", "Hailee Steinfeld","Brian Tyree Henry"],
    "descripcion":"Dom Toretto y su familia se convierten en el objetivo del vengativo hijo del capo de las drogas Hernán Reyes.",
    "ranking":"8,9",
    "duracion":"140"
  },
];

function llenarInformacion(index) {
  const elemento = data[index];
  informacionDiv.innerHTML = `
    <div class="tipo">${elemento.tipo}</div>
    <div class="hd">${elemento.hd}</div>
    <p class="genero">${elemento.genero.join(", ")}</p>
    <div class="anio">
      <i class="fa-solid fa-calendar-days" style="color: #d40f45;"></i>
      <p>${Array.isArray(elemento.anio) ? elemento.anio.join(", ") : elemento.anio}</p>
    </div>
  `;
}

function llenarInformacion(index) {
    const elemento = data2[index];
    informacionDiv2.innerHTML = `
    <div class="nombre">Título: ${elemento.nombre}</div>
      <div class="tipo">${elemento.tipo}</div>
      <div class="anio">
        <i class="fa-solid fa-calendar-days" style="color: #d40f45;"></i>
        <p>${Array.isArray(elemento.anio) ? elemento.anio.join(", ") : elemento.anio}</p>
      </div>
      <p class="genero">${elemento.genero.join(", ")}</p>
      <div class="direccion">Dirección: ${elemento.direccion}</div>      
      <div class="reparto">Reparto: ${elemento.reparto}</div>
      <div class="ranking">${elemento.ranking}</div>
      <div class="duracion">${elemento.duracion}'</div>


    `;
  }

llenarInformacion(0); 

