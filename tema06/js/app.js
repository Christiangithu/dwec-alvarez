/*
  Tarea 6 · DWEC · Christian Alvarez
  Objetos y arrays.

  Cómo usar esta plantilla:
  · Hay una función por botón. Escribe tu código donde pone TODO y, cuando termines, borra el TODO.
  · Ya tienes hechas, como modelo, comoTexto(), pintarProductos() y el ejercicio 2 casi entero:
    léelas antes de empezar, porque el resto se hace igual.
  · Los resultados se pintan en la página como en el tema 5: createElement, textContent, classList y append.
    Antes de volver a pintar una lista, vacíala con textContent = "".
  · Las funciones se escriben con function, también las que pasas a forEach, sort, map, filter o reduce.
    Las funciones flecha las veremos en el tema 7: en esta tarea, no las uses.
  · Cada función deja también su rastro en la consola con console.log().
  · let y const, nunca var. Compara siempre con ===. Comillas rectas.
*/

console.log("app.js cargado");


// ============================================================
// Ayuda: un array como texto, por ejemplo [1, 2, 3]
// (ya está hecha: úsala cuando quieras enseñar un array)
// ============================================================

function comoTexto(lista) {
  return "[" + lista.join(", ") + "]";
}


// ============================================================
// Ejercicio 1 · Ficha de estudiante
// ============================================================


const estudiante = {

  nombre: "Christian",
  apellidos: "Alvarez",
  edad: 31,
  curso: "DWEC",
  presentarse: function () {
    return "Soy " + this.nombre + " " + this.apellidos + ", tengo " + this.edad + " años y estudio " + this.curso + ".";
  }
};


function verFicha() {

  const salida = document.querySelector("#salida1");
  salida.textContent = "";

  const ul = document.createElement("ul");
  ul.classList.add("list-group");

  const claves = ["nombre", "apellidos", "edad", "curso"];
  claves.forEach(function (clave) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = clave + ": " + estudiante[clave];
    ul.append(li);
  });
  const p = document.createElement("p");
  p.classList.add("mt-2", "mb-0");
  p.textContent = estudiante.presentarse();

  salida.append(ul, p);
  console.log("Ejercicio 1: estudiante →", estudiante);
}

function cumplirAnios() {
  estudiante.edad = estudiante.edad + 1;
  verFicha();
}

function quitarCurso() {
  delete estudiante.curso;
  verFicha();
}



// ============================================================
// Ejercicio 2 · Colores
// mostrarColores() y anadirColor() ya están hechas: son el modelo
// ============================================================

const colores = ["rojo", "verde", "azul"];

function mostrarColores() {
  const lista = document.querySelector("#listaColores");
  lista.textContent = "";   // vaciamos la lista antes de volver a pintarla

  colores.forEach(function (color) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = color;
    lista.append(li);
  });

  document.querySelector("#totalColores").textContent = colores.length;
}

function avisar2(mensaje) {
  const aviso = document.querySelector("#aviso2");
  aviso.textContent = mensaje;
  aviso.classList.remove("d-none");
}

function anadirColor() {
  const casilla = document.querySelector("#color");
  const color = casilla.value.trim();

  if (color === "") {
    avisar2("Escribe un color antes de pulsar «Añadir».");
    return;
  }

  colores.push(color);   // push añade al final
  casilla.value = "";
  document.querySelector("#aviso2").classList.add("d-none");
  mostrarColores();
  console.log("Ejercicio 2: push →", comoTexto(colores));
}

function quitarUltimo() {
  if (colores.length === 0) {
    avisar2("No hay colores para eliminar.");
    return;
  }

  document.querySelector("#aviso2").classList.add("d-none");
  const eliminado = colores.pop();
  mostrarColores();
  console.log("Ejercicio 2: pop → color eliminado:", eliminado, "| Lista:", comoTexto(colores));
}

function quitarPrimero() {
  if (colores.length === 0) {
    avisar2("No hay colores para eliminar.");
    return;
  }

  document.querySelector("#aviso2").classList.add("d-none");
  const eliminado = colores.shift();
  mostrarColores();
  console.log("Ejercicio 2: shift → color eliminado:", eliminado, "| Lista:", comoTexto(colores));
}

mostrarColores();   // pinta los tres colores de partida nada más cargar


// ============================================================
// Ejercicio 3 · Catálogo de productos
// ============================================================

// Puedes cambiar los productos por otros, pero deja al menos seis, con estas tres propiedades
const productos = [
  { nombre: "Teclado mecánico", precio: 79.9, categoria: "Periféricos" },
  { nombre: "Ratón inalámbrico", precio: 24.5, categoria: "Periféricos" },
  { nombre: "Monitor 27 pulgadas", precio: 189, categoria: "Pantallas" },
  { nombre: "Alfombrilla XL", precio: 12, categoria: "Accesorios" },
  { nombre: "Webcam HD", precio: 49.99, categoria: "Vídeo" },
  { nombre: "Auriculares con micro", precio: 59, categoria: "Audio" }
];

// Ya está hecha: pinta en la tabla la lista de productos que le pases
function pintarProductos(lista) {
  const cuerpo = document.querySelector("#tablaProductos");
  cuerpo.textContent = "";

  lista.forEach(function (producto) {
    const fila = document.createElement("tr");

    const nombre = document.createElement("td");
    nombre.textContent = producto.nombre;

    const categoria = document.createElement("td");
    categoria.textContent = producto.categoria;

    const precio = document.createElement("td");
    precio.classList.add("text-end");
    precio.textContent = producto.precio.toFixed(2) + " €";

    fila.append(nombre, categoria, precio);
    cuerpo.append(fila);
  });
}

function mostrarProductos() {
  pintarProductos(productos);
  document.querySelector("#mensaje3").textContent = "Mostrando los " + productos.length + " productos del catálogo.";
  console.log("Ejercicio 3: todos los productos →", productos);
}

function ordenarPorPrecio() {
  const copia = [...productos];
  copia.sort(function (a, b) {
    return a.precio - b.precio;
  });

  pintarProductos(copia);
  document.querySelector("#mensaje3").textContent = "Productos ordenados de más barato a más caro.";
  console.log("Ejercicio 3: productos ordenados por precio →", copia);
}

function filtrarCaros() {
  const caros = productos.filter(function (producto) {
    return producto.precio > 50;
  });

  pintarProductos(caros);
  document.querySelector("#mensaje3").textContent = "Mostrando " + caros.length + " productos de más de 50 €.";
  console.log("Ejercicio 3: productos caros (> 50 €) →", caros);
}

function buscarProducto() {
  const texto = document.querySelector("#buscarProducto").value.trim().toLowerCase();
  const mensaje = document.querySelector("#mensaje3");

  if (texto === "") {
    mensaje.textContent = "Escribe un término de búsqueda.";
    return;
  }

  const encontrado = productos.find(function (producto) {
    return producto.nombre.toLowerCase().includes(texto);
  });

  if (encontrado === undefined) {
    mensaje.textContent = "No se ha encontrado ningún producto que coincida con «" + texto + "».";
    pintarProductos([]);
    console.log("Ejercicio 3: búsqueda sin coincidencias para:", texto);
  } else {
    mensaje.textContent = "Producto encontrado:";
    pintarProductos([encontrado]);
    console.log("Ejercicio 3: producto encontrado →", encontrado);
  }
}

mostrarProductos();   // la tabla completa nada más cargar


// ============================================================
// Ejercicio 4 · Notas
// ============================================================

const alumno = {
  nombre: "Christian",
  notas: [],
  anadirNota: function (nota) {
    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
      return false;
    }
    this.notas.push(nota);
    return true;
  },
  media: function () {
    if (this.notas.length === 0) {
      return 0;
    }
    const suma = this.notas.reduce(function (total, n) {
      return total + n;
    }, 0);
    return suma / this.notas.length;
  }
};

function mostrarNotas() {
  const contenedor = document.querySelector("#notas");
  contenedor.textContent = "";

  alumno.notas.forEach(function (nota) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "me-1");
    if (nota >= 5) {
      badge.classList.add("text-bg-success");
    } else {
      badge.classList.add("text-bg-danger");
    }
    badge.textContent = nota.toFixed(2);
    contenedor.append(badge);
  });

  const pMedia = document.querySelector("#media");
  if (alumno.notas.length === 0) {
    pMedia.textContent = "Todavía no hay notas.";
  } else {
    pMedia.textContent = "Media de " + alumno.notas.length + " notas: " + alumno.media().toFixed(2);
  }
}


function anadirNota() {
  const contenedor = document.querySelector("#nota");
  const error4 = document.querySelector("#error4");

  if (contenedor.value.trim() === "") {
    error4.textContent = "Por favor, introduce una nota.";
    error4.classList.remove("d-none");
    return;
  }

  const valor = Number(contenedor.value);
  const exito = alumno.anadirNota(valor);

  if (!exito) {
    error4.textContent = "La nota debe ser un número válido entre 0 y 10.";
    error4.classList.remove("d-none");
  } else {
    error4.classList.add("d-none");
    contenedor.value = "";
    mostrarNotas();
    console.log("Ejercicio 4: nota añadida. Notas actuales →", comoTexto(alumno.notas));
  }
}

function borrarNotas() {
  alumno.notas = [];
  mostrarNotas();
  console.log("Ejercicio 4: notas borradas.");
}

mostrarNotas();


// ============================================================
// Ejercicio 5 · map, filter y reduce
// ============================================================

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function verDobles() {
  const dobles = numeros.map(function (n) {
    return n * 2;
  });

  const salida = document.querySelector("#salida5");
  salida.textContent = "Dobles (map): " + comoTexto(dobles) + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - map:", dobles);
}

function verPares() {
  const pares = numeros.filter(function (n) {
    return n % 2 === 0;
  });

  const salida = document.querySelector("#salida5");
  salida.textContent = "Pares (filter): " + comoTexto(pares) + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - filter:", pares);
}

function verSuma() {
  const suma = numeros.reduce(function (total, n) {
    return total + n;
  }, 0);

  const salida = document.querySelector("#salida5");
  salida.textContent = "Suma total (reduce): " + suma + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - reduce:", suma);
}

function verCadena() {
  const pares = numeros.filter(function (n) {
    return n % 2 === 0;
  });

  const doblesPares = pares.map(function (n) {
    return n * 2;
  });

  const sumaDobles = doblesPares.reduce(function (total, n) {
    return total + n;
  }, 0);

  const salida = document.querySelector("#salida5");
  salida.textContent = "1. Pares: " + comoTexto(pares) +
    "\n2. Dobles de los pares: " + comoTexto(doblesPares) +
    "\n3. Suma de los dobles: " + sumaDobles;

  console.log("Ejercicio 5 - Cadena:", { pares: pares, doblesPares: doblesPares, sumaDobles: sumaDobles });
}


// ============================================================
// Ejercicio 6 · Ciudades
// ============================================================

const ciudadesOriginal = ["Granada", "Sevilla", "Málaga", "Córdoba", "Jaén", "Almería", "Cádiz", "Huelva"];
let ciudades = [...ciudadesOriginal];   // una copia: splice cambia ciudades y así podemos restaurarla

function mostrarCiudades() {
  const contenedor = document.querySelector("#ciudades");
  contenedor.textContent = "";

  ciudades.forEach(function (ciudad, posicion) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "text-bg-primary", "me-1", "mb-1");
    badge.textContent = posicion + " · " + ciudad;
    contenedor.append(badge);
  });
}

function verSlice() {
  const trozo = ciudades.slice(2, 5);
  const salida = document.querySelector("#salida6");
  salida.textContent = "slice(2, 5) devuelve: " + comoTexto(trozo) +
    "\nCiudades en el array original: " + ciudades.length + " (no se modifica con slice)";
  console.log("Ejercicio 6 - slice:", trozo, "| Quedan:", ciudades.length);
}

function hacerSplice() {
  const salida = document.querySelector("#salida6");

  if (ciudades.length < 3) {
    salida.textContent = "No hay suficientes ciudades para hacer splice(2, 2). ¡Restaura la lista primero!";
    return;
  }

  const eliminadas = ciudades.splice(2, 2);
  salida.textContent = "splice(2, 2) elimina y devuelve: " + comoTexto(eliminadas) +
    "\nQuedan en el array: " + ciudades.length + " ciudades.";

  mostrarCiudades();
  console.log("Ejercicio 6 - splice eliminadas:", eliminadas, "| Quedan:", ciudades);
}

function restaurarCiudades() {
  ciudades = [...ciudadesOriginal];
  mostrarCiudades();
  document.querySelector("#salida6").textContent = "Lista de ciudades restaurada a su estado original.";
  console.log("Ejercicio 6: ciudades restauradas →", ciudades);
}

function buscarCiudad() {
  const nombre = document.querySelector("#buscarCiudad").value.trim();
  const salida = document.querySelector("#salida6");

  if (nombre === "") {
    salida.textContent = "Escribe el nombre de una ciudad antes de buscar.";
    return;
  }

  const existe = ciudades.includes(nombre);
  const posicion = ciudades.indexOf(nombre);

  salida.textContent = "Búsqueda de «" + nombre + "»:\n" +
    "- includes(): " + existe + "\n" +
    "- indexOf(): " + posicion;

  console.log("Ejercicio 6 - Búsqueda:", nombre, "| includes:", existe, "| indexOf:", posicion);
}

mostrarCiudades();
