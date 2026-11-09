/*
  Tarea 7 · DWEC · Christian Alvarez
  Funciones, flechas y clases.

  Cómo usar esta plantilla:
  · Hay una función por botón. Escribe tu código donde pone TODO y, cuando termines, borra el TODO.
  · La regla de este tema:
      - declaración, function nombre() { ... }, para las funciones con nombre, como las de los botones;
      - FLECHA para todos los callbacks: forEach, map, filter, sort, reduce, find, some...;
      - nunca una flecha como método: en las clases, la forma corta media() { ... }.
  · Los resultados se pintan en la página como en los temas 5 y 6: createElement, textContent, classList y append.
  · Cada función deja también su rastro en la consola con console.log().
  · let y const, nunca var. Compara siempre con ===. Comillas rectas.
*/

console.log("app.js cargado");


// ============================================================
// Ayuda: pinta una lista de textos en un <ul class="list-group">
// (ya está hecha, y su forEach ya lleva una flecha: es el modelo)
// ============================================================

function pintarLista(selector, textos) {
  const lista = document.querySelector(selector);
  lista.textContent = "";

  textos.forEach((texto) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = texto;
    lista.append(li);
  });
}


// ============================================================
// Ejercicio 1 · Precio final
// ============================================================

// Calcula el precio aplicando primero el descuento y después el IVA.
function calcularPrecio(base, iva = 21, descuento = 0) {
  const baseConDescuento = base * (1 - descuento / 100);
  const precioFinal = baseConDescuento * (1 + iva / 100);
  return precioFinal;
}

// Ya está hecha: 74.8 → "74.80 €"
function formatearEuros(cantidad) {
  return cantidad.toFixed(2) + " €";
}

// Lee los campos, comprueba los datos y muestra el desglose del precio.
function mostrarPrecio() {
  const baseInput = document.querySelector("#base").value.trim();
  const ivaInput = document.querySelector("#iva").value;
  const descuentoInput = document.querySelector("#descuento").value.trim();
  const errorEl = document.querySelector("#error1");

  const base = Number(baseInput);
  const iva = Number(ivaInput);

  if (baseInput === "" || Number.isNaN(base) || base < 0) {
    errorEl.textContent = "La base no puede estar vacía ni ser negativa.";
    errorEl.classList.remove("d-none");
    return;
  }

  let descuento;
  if (descuentoInput === "") {
    descuento = undefined;
  } else {
    descuento = Number(descuentoInput);
    if (Number.isNaN(descuento) || descuento < 0 || descuento > 100) {
      errorEl.textContent = "El descuento debe estar entre 0 y 100.";
      errorEl.classList.remove("d-none");
      return;
    }
  }

  errorEl.classList.add("d-none");

  const precioFinal = descuento === undefined ? calcularPrecio(base, iva) : calcularPrecio(base, iva, descuento);

  const descPorcentaje = descuento === undefined ? 0 : descuento;

  const desglose = [
    `Precio sin IVA: ${formatearEuros(base)}`,
    `Descuento: ${descPorcentaje}%`,
    `IVA: ${iva}%`,
    `Precio final: ${formatearEuros(precioFinal)}`
  ];

  pintarLista("#salida1", desglose);
  console.log("Ejercicio 1: calcularPrecio →", precioFinal);
}


// ============================================================
// Ejercicio 2 · Películas: de function a flecha
// ============================================================

// Películas usadas por las distintas operaciones del ejercicio.
const peliculas = [
  { titulo: "El laberinto del fauno", anio: 2006, duracion: 118 },
  { titulo: "Coco", anio: 2017, duracion: 105 },
  { titulo: "Interstellar", anio: 2014, duracion: 169 },
  { titulo: "Regreso al futuro", anio: 1985, duracion: 116 },
  { titulo: "Parásitos", anio: 2019, duracion: 132 },
  { titulo: "Toy Story", anio: 1995, duracion: 81 }
];

function comoTexto(pelicula) {
  return `${pelicula.titulo} (${pelicula.anio}) · ${pelicula.duracion} min`;
}

function verTitulos() {
  // map obtiene un nuevo array con solo los títulos.
  const titulos = peliculas.map((pelicula) => pelicula.titulo);
  pintarLista("#salida2", titulos);
  document.querySelector("#mensaje2").textContent = `${titulos.length} títulos.`;
  console.log("Ejercicio 2: map →", titulos);
}

function verLargas() {
  // filter conserva las películas que superan las dos horas.
  const largas = peliculas.filter((pelicula) => pelicula.duracion > 120);
  pintarLista("#salida2", largas.map(comoTexto));   // comoTexto ya es una función: se pasa sin paréntesis
  document.querySelector("#mensaje2").textContent = `${largas.length} películas duran más de 2 horas.`;
  console.log("Ejercicio 2: filter →", largas);
}

function ordenarPorAnio() {
  // Se ordena una copia para mantener intacto el array original.
  const ordenadas = [...peliculas].sort((a, b) => a.anio - b.anio);
  pintarLista("#salida2", ordenadas.map(comoTexto));
  document.querySelector("#mensaje2").textContent = "De la más antigua a la más reciente.";
  console.log("Ejercicio 2: sort →", ordenadas);
}

function verDuracionTotal() {
  // reduce acumula la duración de todas las películas.
  const minutos = peliculas.reduce((total, pelicula) => total + pelicula.duracion, 0);
  pintarLista("#salida2", [`${minutos} minutos de películas`]);
  document.querySelector("#mensaje2").textContent = "La suma de las seis duraciones.";
  console.log("Ejercicio 2: reduce →", minutos);
}

function buscarAntigua() {
  // find devuelve la primera película anterior a 1990.
  const antigua = peliculas.find((pelicula) => pelicula.anio < 1990);
  if (antigua === undefined) {
    document.querySelector("#mensaje2").textContent = "No se ha encontrado ninguna película anterior a 1990.";
    pintarLista("#salida2", []);
  } else {
    document.querySelector("#mensaje2").textContent = "Primera película anterior a 1990 encontrada.";
    pintarLista("#salida2", [comoTexto(antigua)]);
  }
  console.log("Ejercicio 2: find →", antigua);
}


// ============================================================
// Ejercicio 3 · Tu propio callback
// ============================================================

// Array que se transforma sin cambiar sus valores originales.
const numeros = [3, -1, 4, -1, 5, 9];
document.querySelector("#numeros3").textContent = `const numeros = [${numeros.join(", ")}];`;

// Aplica la función recibida a cada elemento y devuelve los resultados.
function transformar(lista, operacion) {
  const resultado = [];
  for (const elemento of lista) {
    resultado.push(operacion(elemento));
  }
  return resultado;
}

// Muestra el resultado propio y lo compara con el obtenido mediante map.
function mostrar3(nombre, resultado, conMap) {
  const salida = document.querySelector("#salida3");
  salida.textContent = "";
  const lineas = [
    `${nombre} → [${resultado.join(", ")}]`,
    `con map → [${conMap.join(", ")}]`,
    `numeros → [${numeros.join(", ")}] (no cambia)`
  ];
  lineas.forEach((linea) => {
    const p = document.createElement("p");
    p.classList.add("mb-1");
    p.textContent = linea;
    salida.append(p);
  });
}

function verDobles() {
  const resultado = transformar(numeros, (n) => n * 2);
  mostrar3("dobles", resultado, numeros.map((n) => n * 2));
  console.log("Ejercicio 3: dobles →", resultado);
}

function verCuadrados() {
  const resultado = transformar(numeros, (n) => n ** 2);
  mostrar3("cuadrados", resultado, numeros.map((n) => n ** 2));
  console.log("Ejercicio 3: cuadrados →", resultado);
}

function verAbsolutos() {
  const resultado = transformar(numeros, Math.abs);
  mostrar3("absolutos", resultado, numeros.map(Math.abs));
  console.log("Ejercicio 3: absolutos →", resultado);
}


// ============================================================
// Ejercicio 4 · Dos contadores con closure
// ============================================================

// Cada contador conserva su propia cuenta y la incrementa según el paso.
function crearContador(paso = 1) {
  let cuenta = 0;
  return function () {
    cuenta += paso;
    return cuenta;
  };
}

const contarDeUno = crearContador();
const contarDeCinco = crearContador(5);

function sumarUno() {
  const valor = contarDeUno();
  document.querySelector("#cuenta1").textContent = valor;
  console.log("Ejercicio 4: de 1 en 1 →", valor);
}

function sumarCinco() {
  const valor = contarDeCinco();
  document.querySelector("#cuenta5").textContent = valor;
  console.log("Ejercicio 4: de 5 en 5 →", valor);
}

// ============================================================
// Ejercicio 5 · Clases
// ============================================================

// Clase base: guarda los datos del alumno y gestiona sus notas.
class Alumno {
  constructor(nombre, curso) {
    this.nombre = nombre;
    this.curso = curso;
    this.notas = [];
  }

  anadirNota(nota) {
    if (typeof nota !== "number" || Number.isNaN(nota) || nota < 0 || nota > 10) {
      return false;
    }
    this.notas.push(nota);
    return true;
  }

  media() {
    if (this.notas.length === 0) {
      return 0;
    }
    const suma = this.notas.reduce((acc, n) => acc + n, 0);
    return suma / this.notas.length;
  }

  presentarse() {
    return `${this.nombre}, de ${this.curso}`;
  }
}

// Extiende Alumno con una empresa y una presentación especializada.
class AlumnoFCT extends Alumno {
  constructor(nombre, curso, empresa) {
    super(nombre, curso);
    this.empresa = empresa;
  }

  presentarse() {
    return `${super.presentarse()}, en prácticas en ${this.empresa}`;
  }
}

// Datos iniciales para mostrar un ejemplo de cada tipo de alumno.
const alumnos = [];
const alumno1 = new Alumno("Lucía Martín", "2.º DAW");
alumno1.anadirNota(8);
alumno1.anadirNota(8);

const alumno2 = new AlumnoFCT("Marcos Ruiz", "2.º DAW", "TecnoSur");
alumno2.anadirNota(7);
alumno2.anadirNota(7.5);

alumnos.push(alumno1, alumno2);

// Genera una tarjeta con la presentación, media y tipo de cada alumno.
function pintarAlumnos() {
  const contenedor = document.querySelector("#listaAlumnos");
  contenedor.textContent = "";

  alumnos.forEach((alumno) => {
    const columna = document.createElement("div");
    columna.classList.add("col-12", "col-md-6", "col-xl-4");

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("border", "rounded", "p-2", "h-100");

    const frase = document.createElement("p");
    frase.classList.add("mb-1");
    frase.textContent = alumno.presentarse();

    const media = document.createElement("span");
    media.classList.add("badge", "me-1");
    if (alumno.notas.length === 0) {
      media.classList.add("text-bg-secondary");
      media.textContent = "Sin notas";
    } else {
      media.classList.add(alumno.media() >= 5 ? "text-bg-success" : "text-bg-danger");
      media.textContent = `Media ${alumno.media().toFixed(2)}`;
    }

    tarjeta.append(frase, media);

    if (alumno instanceof AlumnoFCT) {
      const fct = document.createElement("span");
      fct.classList.add("badge", "text-bg-info");
      fct.textContent = "FCT";
      tarjeta.append(fct);
    }

    columna.append(tarjeta);
    contenedor.append(columna);
  });

  document.querySelector("#totalAlumnos").textContent = alumnos.length;
}

// Valida el formulario, crea el alumno y actualiza la lista.
function crearAlumno() {
  const nombreInput = document.querySelector("#nombre5").value.trim();
  const cursoInput = document.querySelector("#curso5").value;
  const empresaInput = document.querySelector("#empresa5").value.trim();
  const notasInput = document.querySelector("#notas5").value.trim();
  const errorEl = document.querySelector("#error5");

  if (nombreInput === "") {
    errorEl.textContent = "El nombre no puede estar vacío.";
    errorEl.classList.remove("d-none");
    return;
  }

  let nuevoAlumno;
  if (empresaInput !== "") {
    nuevoAlumno = new AlumnoFCT(nombreInput, cursoInput, empresaInput);
  } else {
    nuevoAlumno = new Alumno(nombreInput, cursoInput);
  }

  if (notasInput !== "") {
    const arrayNotas = notasInput.split(",").map((texto) => Number(texto.trim()));
    const algunaInvalida = arrayNotas.some((n) => Number.isNaN(n) || n < 0 || n > 10);

    if (algunaInvalida) {
      errorEl.textContent = "Una o varias notas introducidas no son válidas (deben estar entre 0 y 10).";
      errorEl.classList.remove("d-none");
      return;
    }

    arrayNotas.forEach((n) => nuevoAlumno.anadirNota(n));
  }

  errorEl.classList.add("d-none");
  alumnos.push(nuevoAlumno);

  document.querySelector("#nombre5").value = "";
  document.querySelector("#empresa5").value = "";
  document.querySelector("#notas5").value = "";

  pintarAlumnos();
  console.log("Ejercicio 5: alumno creado →", nuevoAlumno);
}

pintarAlumnos();

// ============================================================
// Ejercicio 6 · Fechas y textos
// ============================================================

// Calcula los días entre la fecha indicada y el día de hoy.
function diasHasta(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const msPorDia = 1000 * 60 * 60 * 24;
  const diferenciaMs = fecha.getTime() - hoy.getTime();

  return Math.round(diferenciaMs / msPorDia);
}

// Lee la fecha, calcula la diferencia y muestra un mensaje adecuado.
function mostrarDias() {
  const valor = document.querySelector("#fecha6").value; // "2026-12-25", o "" si está vacía
  const salida = document.querySelector("#salida6a");

  if (valor === "") {
    salida.textContent = "Elige una fecha.";
    return;
  }

  const [anio, mes, dia] = valor.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const dias = diasHasta(fecha);
  const fechaFormateada = fecha.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (dias > 0) {
    salida.textContent = `Faltan ${dias} días: será ${fechaFormateada}.`;
  } else if (dias === 0) {
    salida.textContent = `Es hoy: ${fechaFormateada}.`;
  } else {
    salida.textContent = `Fue hace ${Math.abs(dias)} días: fue ${fechaFormateada}.`;
  }

  console.log("Ejercicio 6a: días hasta →", dias);
}

// Extrae la primera letra de cada palabra del nombre.
function iniciales(nombreCompleto) {
  return nombreCompleto
    .trim()
    .split(" ")
    .filter((palabra) => palabra.length > 0)
    .map((palabra) => palabra[0].toUpperCase())
    .join("");
}

// Crea un usuario con las iniciales y un número aleatorio de tres cifras.
function crearUsuario(nombreCompleto) {
  const inis = iniciales(nombreCompleto).toLowerCase();
  const numeroAzar = Math.floor(Math.random() * 1000);
  const numeroFormateado = String(numeroAzar).padStart(3, "0");
  return `${inis}${numeroFormateado}`;
}

// Muestra las iniciales y el usuario generado a partir del nombre.
function mostrarIniciales() {
  const nombreInput = document.querySelector("#nombre6").value;
  const salida = document.querySelector("#salida6b");

  if (nombreInput.trim() === "") {
    salida.textContent = "Escribe un nombre completo.";
    return;
  }

  const inis = iniciales(nombreInput);
  const usr = crearUsuario(nombreInput);

  salida.textContent = `Iniciales: ${inis} · usuario: ${usr}`;
  console.log("Ejercicio 6b: iniciales y usuario →", { iniciales: inis, usuario: usr });
}
