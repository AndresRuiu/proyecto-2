const informacionDiv = document.getElementById("informacion");
const data = [
  {
    "tipo": "Película",
    "hd": "4K",
    "genero": ["Aventura","Familiar","Fantasia"],
    "anio": ["2023"],
  },
];

const informacionDiv2 = document.getElementById("informacion2");
const data2 = [
  {
    "nombre": "La Sirenita",
    "anio": ["2023"],
    "direccion": ["Rob Marshall"],
    "tipo": "Pelicula",
    "genero": ["Aventura","Familiar","Fantasia"],
    "reparto": ["Halle Bailey", "Jonah Hauer-King","Melissa McCarthy"],
    "descripcion":"Una joven sirena hace un trato con una bruja marina para cambiar su hermosa voz por piernas humanas para poder descubrir el mundo sobre el agua e impresionar a un príncipe.",
    "ranking":"7,2",
    "duracion":"135"
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

