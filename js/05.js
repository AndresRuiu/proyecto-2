
const informacionDiv = document.getElementById("informacion");
const data = [
  {
    "tipo": "Película",
    "hd": "4K",
    "genero": ["Accion","Aventura","Fantasia"],
    "anio": ["2023"],
  },
];

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

