/*
  Tarea 5 · DWEC · Christian Alvarez
  Manipular el DOM.

  Cómo usar esta plantilla:
  · Desde este tema, el JavaScript escribe en la página: selecciona elementos y cambia su texto, sus clases...
  · Hay una función por botón. Escribe tu código donde pone TODO y, cuando termines, borra el TODO.
  · app.js se carga en el <head> con defer: cuando se ejecuta, el HTML ya está leído.
  · Selecciona con document.querySelector() / querySelectorAll() (o getElementById).
  · Texto con textContent; aspecto con classList y las clases de Bootstrap (no con style).
  · Cada función deja también su rastro en la consola con console.log().
  · let y const, nunca var. Compara siempre con ===. Comillas rectas.
*/

console.log("app.js cargado");


// ============================================================
// Ejercicio 1 · Selectores y modificación
// Un selector distinto para cada párrafo
// ============================================================

function aplicarCambios() {
  // El modelo: el primer párrafo, por su id
  const primero = document.getElementById("primero");
  primero.textContent = "Texto modificado por JavaScript";

  //Segundo párrafo, con querySelector y su clase (.segundo): resaltado con la clase "bg-warning-subtle".
  const segundoParrafo = document.querySelector("#contenido .segundo");
  segundoParrafo.classList.add("bg-warning-subtle");

  //Tercer párrafo, con querySelectorAll("#contenido p") puesto en rojo con "text-danger".
  const parrafos = document.querySelectorAll("#contenido p");
    parrafos[2].classList.add("text-danger");

  //Muestra por consola.
  console.log("Cambios aplicados");
}


// ============================================================
// Ejercicio 2 · Crear y eliminar nodos
// ============================================================

function anadirParrafo() {
  //Crea un <p> con document.createElement().
  const nuevoP = document.createElement("p");
  //Se añade el texto «Párrafo nuevo N (Numero de parrafo agregado)», 
  const numParrafos = document.querySelector("#contenido").children.length + 1;
  nuevoP.textContent = `Párrafo nuevo ${numParrafos}`;

  //Se hace un append() del nuevo <p>
  const contenedor = document.querySelector("#contenido");
  contenedor.append(nuevoP);

  //Ocultar el aviso (No quedan párrafos que eliminar) 
  document.querySelector("#aviso2").classList.add("d-none");

  console.log("Párrafo añadido");
}

function eliminarUltimo() {
  //Elimina el último párrafo de #contenido (lastElementChild).
  const contenedor = document.querySelector("#contenido");
  const ultimoP = contenedor.lastElementChild;

  //Muestra "No quedan párrafos que eliminar" si no hay parrafos (si hay parrafo lo elimina).
  const aviso = document.querySelector("#aviso2");
  if (ultimoP === null) {
    aviso.classList.remove("d-none");
  } else {
    ultimoP.remove();
    if (contenedor.children.length === 0) {
      aviso.classList.remove("d-none");
    }
  }

  console.log("Eliminar último párrafo ejecutado");
}


// ============================================================
// Ejercicio 3 · Resaltar al pasar el ratón
// ============================================================

function activarResaltado() {
  const parrafos = document.querySelectorAll("#contenido p");

  for (const parrafo of parrafos) {
    // addEventListener("mouseenter", ...) ejecuta la función cuando el ratón entra en el párrafo.
    // Los eventos los veremos a fondo en el tema 9: de momento, copia este modelo.
    parrafo.addEventListener("mouseenter", function () {
      parrafo.classList.add("bg-body-secondary");
    });

    //Lo mismo con "mouseleave" (cuando el ratón sale) para quitar la clase.
    parrafo.addEventListener("mouseleave", function () {
      parrafo.classList.remove("bg-body-secondary");
    });
  }

  //Indica en cuántos párrafos se ha activado el resaltado (parrafos.length).
  console.log(`Resaltado activado en ${parrafos.length} párrafos.`);
}


// ============================================================
// Ejercicio 4 · Cambiar el primer párrafo
// ============================================================

function cambiarTexto() {
  //Para capturar el valor del input #nuevoTexto y aplicar trim() para limpiar espacios en blanco.
  const inputTexto = document.querySelector("#nuevoTexto");
  const texto = inputTexto.value.trim();
  const error4 = document.querySelector("#error4");

  //Si está vacío, muestra el error #error4.
  if (texto === "") {
    error4.classList.remove("d-none");
  } else {
    //Si hay texto, lo pone en el primer párrafo de #contenido con textContent y oculta el error (El campo está vacío.).
    const primero = document.querySelector("#contenido p");
    if (primero) {
      primero.textContent = texto;
    }
    error4.classList.add("d-none");
  }

  console.log("cambiarTexto ejecutado");
}

function cambiarConHtml() {

  //Para cambiar el texto cambiarTexto(), pero con innerHTML.
  const inputTexto = document.querySelector("#nuevoTexto");
  const texto = inputTexto.value.trim();
  const error4 = document.querySelector("#error4");

  if (texto === "") {
    error4.classList.remove("d-none");
  } else {
    const primero = document.querySelector("#contenido p");
    if (primero) {
      primero.innerHTML = texto;
    }
    error4.classList.add("d-none");
  }

  console.log("cambiarConHtml ejecutado");
}


// ============================================================
// Ejercicio 5 · Lista de tareas
// ============================================================

function anadirTarea() {

  //Lee el texto de #tareaInput (value + trim). Si está vacío, muestra un mensaje en #error5.
  const inputTarea = document.querySelector("#tareaInput");
  const textoTarea = inputTarea.value.trim();
  const error5 = document.querySelector("#error5");

  if (textoTarea === "") {
    error5.textContent = "Por favor, introduce información para la tarea.";
    error5.classList.remove("d-none");
  } else {
    error5.classList.add("d-none");
    error5.textContent = "";

    //En caso contrario, genera un elemento <li class="list-group-item"> que contenga un <input type="checkbox" class="form-check-input"> y un <span> con el texto de la tarea..
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "gap-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "me-2");

    const span = document.createElement("span");
    span.textContent = textoTarea;

    li.append(checkbox, span);

    const listaTareas = document.querySelector("#listaTareas");
    listaTareas.append(li);

    inputTarea.value = "";

    //Actualiza #totalTareas con el número de <li> que hay en la lista.
    const totalTareas = document.querySelector("#totalTareas");
    totalTareas.textContent = listaTareas.children.length;
  }

  console.log("anadirTarea ejecutado");
}

function borrarCompletadas() {
  //Elimina las casillas marcadas de la lista.
  const completadas = document.querySelectorAll("#listaTareas input:checked");
  const error5 = document.querySelector("#error5");

  //Si no hay casillas marcadas, muestra un mensaje en #error5. Si hay, las borra y actualiza #totalTareas.
  if (completadas.length === 0) {
    error5.textContent = "No hay tareas completadas marcadas para borrar.";
    error5.classList.remove("d-none");
  } else {
    error5.classList.add("d-none");
    error5.textContent = "";

    for (const checkbox of completadas) {
      const li = checkbox.parentElement;
      li.remove();
    }
  }

  //Actualiza #totalTareas.
  const listaTareas = document.querySelector("#listaTareas");
  const totalTareas = document.querySelector("#totalTareas");
  totalTareas.textContent = listaTareas.children.length;

  console.log("borrarCompletadas ejecutado");
}


// ============================================================
// Ejercicio 6 · Datos de la ventana (BOM)
// ============================================================

function verDatosVentana() {
  // El modelo: el tamaño de la ventana
  const ancho = window.innerWidth;
  const alto = window.innerHeight;
  document.querySelector("#datoVentana").textContent = `${ancho} × ${alto} px`;

//El ancho de pantalla para mostrar el breakpoint de Bootstrap en #datoPunto
  let puntoCorte = "";
  if (ancho < 576) {
    puntoCorte = "xs (< 576px)";
  } else if (ancho < 768) {
    puntoCorte = "sm (≥ 576px)";
  } else if (ancho < 992) {
    puntoCorte = "md (≥ 768px)";
  } else if (ancho < 1200) {
    puntoCorte = "lg (≥ 992px)";
  } else if (ancho < 1400) {
    puntoCorte = "xl (≥ 1200px)";
  } else {
    puntoCorte = "xxl (≥ 1400px)";
  }
  document.querySelector("#datoPunto").textContent = puntoCorte;

  //El tamaño de la pantalla (screen.width y screen.height) en #datoPantalla.
  document.querySelector("#datoPantalla").textContent = `${screen.width} × ${screen.height} px`;

  //URL (location.href) en #datoUrl y el idioma del navegador (navigator.language) en #datoIdioma.
  document.querySelector("#datoUrl").textContent = location.href;
  document.querySelector("#datoIdioma").textContent = navigator.language;

  console.log("verDatosVentana ejecutado");
}