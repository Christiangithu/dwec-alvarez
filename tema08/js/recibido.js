/*
  Tarea 8 · DWEC · Christian Alvarez
  recibido.html: lee lo que ha llegado por GET y lo pinta en la tabla.
  En una web real esto lo haría el servidor; aquí lo hacemos en el navegador para verlo.
*/

console.log("recibido.js cargado");

// Lee la cadena de consulta de la dirección
// location.search es la parte de la URL desde el ?, por ejemplo "?nombre=Luc%C3%ADa&taller=html"
console.log("Ha llegado:", location.search);

// Crea un objeto para obtener los datos enviados por el formulario
const parametros = new URLSearchParams(location.search);
console.log("nombre =", parametros.get("nombre"));

// Muestra la consulta completa en la página
const consulta = document.querySelector("#consulta");
consulta.textContent = location.search || "(nada)";

// Crea una fila de la tabla por cada dato recibido
const tbody = document.querySelector("#datos");
let hayDatos = false;

for (const [campo, valor] of parametros) {
  hayDatos = true;
  const fila = document.createElement("tr");

  const celdaCampo = document.createElement("th");
  celdaCampo.scope = "row";
  celdaCampo.textContent = campo;

  const celdaValor = document.createElement("td");
  celdaValor.textContent = valor === "" ? "(vacío)" : valor;

  fila.append(celdaCampo, celdaValor);
  tbody.appendChild(fila);
}

// Avisa al usuario si no llegaron datos en la URL
const avisoVacio = document.querySelector("#avisoVacio");
if (!hayDatos) {
  console.log("No se recibieron parámetros en la URL");
  avisoVacio.classList.remove("d-none");
}