/*
  Tarea 8 · DWEC · [Tu nombre y apellidos]
  recibido.html: lee lo que ha llegado por GET y lo pinta en la tabla.
  En una web real esto lo haría el servidor; aquí lo hacemos en el navegador para verlo.
*/

console.log("recibido.js cargado");

// location.search es la parte de la URL desde el ?, por ejemplo "?nombre=Luc%C3%ADa&taller=html"
console.log("Ha llegado:", location.search);

// URLSearchParams la separa en pares nombre → valor y decodifica las tildes y los espacios.
// El modelo: un dato suelto, por su name
const parametros = new URLSearchParams(location.search);
console.log("nombre =", parametros.get("nombre"));

// TODO: escribe location.search en #consulta (o «(nada)» si está vacío).
const consulta = document.querySelector("#consulta");
consulta.textContent = location.search || "(nada)";

// TODO: recorre los parámetros con for (const [campo, valor] of parametros) y añade a #datos una fila <tr>
//       por par: un <th> con el campo y un <td> con el valor (textContent: son datos de fuera, nada de innerHTML).
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

// TODO: si no ha llegado ningún dato, muestra un aviso en la página.
const avisoVacio = document.querySelector("#avisoVacio");
if (!hayDatos) {
  console.log("No se recibieron parámetros en la URL");
  avisoVacio.classList.remove("d-none");
}