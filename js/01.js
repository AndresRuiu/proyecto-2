
const informacionDiv = document.getElementById("informacion");
const data = [
  {
    "tipo": "Película",
    "hd": "Barbie",
    "genero": ["Aventura", "Comedia", "Fantasia"],
    "anio": ["2023", "proximamente"],
  },
];

const informacionDiv2 = document.getElementById("informacion2");
const data2 = [
  {
    "nombre": "Barbie",
    "anio": ["2023", "proximamente"],
    "direccion": ["Greta Gerwig"],
    "tipo": "Pelicula",
    "genero": ["Aventura", "Comedia", "Fantasia"],
    "reparto": ["Margot Robbie", "Ryan Gosling", "Kingsley Ben-Adir"],
    "descripcion":"Barbie vive en Barbie Land y luego sucede una historia.",
    "ranking":"-",
    "duracion":"114"
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

