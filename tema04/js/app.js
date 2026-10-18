/*
  Tarea 4 · DWEC · Christian Alvarez
  Calculadora y bucles.

  Cómo usar esta plantilla:
  · Hay una función por botón. Cada una se ejecuta al pulsar su botón de index.html.
  · sumar() está hecha: es el modelo. Escribe las demás donde pone TODO y, cuando termines, borra el TODO.
  · Para leer las casillas y escribir el resultado usa las funciones de js/ayudas.js:
    leerNumero("numero1"), mostrar(texto, color), anadirLinea(texto), anadirBadge(texto, color), limpiarSalida()
  · Además de en la página, cada función deja su rastro en la consola con console.log().
  · let y const, nunca var. Compara siempre con ===. Comillas rectas.
*/

console.log("app.js cargado");

const MAXIMO_REPETICIONES = 20;   // para que un bucle no llene la página


// ============================================================
// Ejercicio 1 · Calculadora
// ============================================================

// El modelo: lee los dos números, comprueba que están y opera
function sumar() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Sumar: falta algún número");
  } else {
    const resultado = n1 + n2;
    mostrar(`${n1} + ${n2} = ${resultado}`);
    console.log(`Sumar: ${n1} + ${n2} = ${resultado}`);
  }
}

//Operación resta
function restar() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Restar: falta algún número");
  } else {
    const resultado = n1 - n2;
    mostrar(`${n1} - ${n2} = ${resultado}`);
    console.log(`Restar: ${n1} - ${n2} = ${resultado}`);
  }
}

//Operación multiplicar
function multiplicar() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Multiplicar: falta algún número");
  } else {
    const resultado = n1 * n2;
    mostrar(`${n1} * ${n2} = ${resultado}`);
    console.log(`Multiplicar: ${n1} * ${n2} = ${resultado}`);
  }
}

//Operación dividir
function dividir() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Dividir: falta algún número");
  } else if (n2 === 0) {
    mostrar("No se puede dividir entre cero.", "danger");
    console.error("Dividir: intento de división por cero");
  } else {
    const resultado = n1 / n2;
    mostrar(`${n1} / ${n2} = ${resultado}`);
    console.log(`Dividir: ${n1} / ${n2} = ${resultado}`);
  }
}

//Operación potencia
function potencia() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Potencia: falta algún número");
  } else {
    const resultado = n1 ** n2;
    mostrar(`${n1} ** ${n2} = ${resultado}`);
    console.log(`Potencia: ${n1} ** ${n2} = ${resultado}`);
  }
}

//Operación resto
function modulo() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Escribe los dos números antes de operar.", "danger");
    console.warn("Resto: falta algún número");
  } else if (n2 === 0) {
    mostrar("No se puede dividir entre cero.", "danger");
    console.error("Resto: intento de división por cero");
  } else {
    const resultado = n1 % n2;
    mostrar(`${n1} % ${n2} = ${resultado}`);
    console.log(`Resto: ${n1} % ${n2} = ${resultado}`);
  }
}
  
// Ejercicio 2 · Comparaciones

//Compara número mayor o igual
function cualEsMayor() {
  const n1 = leerNumero("numero1");
  const n2 = leerNumero("numero2");

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    mostrar("Para comparar se necesita dos números.", "danger");
    console.warn("Comparar: falta un número");
  } else if (n1 > n2){
    mostrar(`El número mayor es: ${n1}`);
    console.log(`El número mayor es: ${n1}`);
  } else if (n1 < n2){
    mostrar(`El número mayor es: ${n2}`);
    console.log(`El número mayor es: ${n2}`);
  } else if (n1 === n2){
    mostrar(`Los números son iguales.`);
    console.log(`Los números son iguales.`);
  }
}

//Comprueba si es par o impar
function parOImpar() {
  const n1 = leerNumero("numero1");
  if (Number.isNaN(n1)) {
    mostrar("Para saber si es par o impar se necesita un número en la casilla 1.", "danger");
    console.warn("Hay que poner un número en el número 1.");
  } else if (!Number.isInteger(n1)) {
    mostrar(`El número ${n1} tiene decimales, por lo que no es ni par ni impar.`, "danger");
    console.warn(`Par o impar: ${n1} tiene decimales`);
  } else {
    const resultado = (n1 % 2 === 0) ? "par" : "impar";
    mostrar(`El número ${n1} es ${resultado}.`);
    console.log(`Par o impar: ${n1} es ${resultado}`);
  }
}


// ============================================================
// Ejercicio 3 · Bucles con texto
// El número 1 dice cuántas veces se repite cada bucle
// ============================================================

//Bucle for
function bucleFor() {
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleFor: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleFor: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleFor: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleFor: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  for (let i = 1; i <= veces; i++) {
    anadirLinea(`for · repetición ${i} de ${veces}`);
    contador++;
  }
  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleFor: completado con ${contador} ${textoRepeticion}`);
}

//Bucle while
function bucleWhile() {
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleWhile: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleWhile: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleWhile: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleWhile: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  let i = 1;
  while (i <= veces) {
    anadirLinea(`while · repetición ${i} de ${veces}`);
    contador++;
    i++;
  }

  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleWhile: completado con ${contador} ${textoRepeticion}`);
}

//Bucle do while
function bucleDoWhile() {
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleDoWhile: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleDoWhile: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleDoWhile: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleDoWhile: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  let i = 1;
  do {
    anadirLinea(`do...while · repetición ${i} de ${veces}`);
    contador++;
    i++;
  } while (i <= veces);

  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleDoWhile: completado con ${contador} ${textoRepeticion}`);
}


// ============================================================
// Ejercicio 4 · Bucles con badges
// ============================================================

//Badge for
function badgesFor() {
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleBadgeFor: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleBadgeFor: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleBadgeFor: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleBadgeFor: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  for (let i = 1; i <= veces; i++) {
    const color = (i % 2 === 0) ? "primary" : "secondary";
    anadirBadge(i, color);
    contador ++;
  }
  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleBadgesFor: completado con ${contador} ${textoRepeticion}`);
}

//badge while
function badgesWhile() {
  // TODO: lo mismo que badgesFor(), con un while.
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleBadgeWhile: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleBadgeWhile: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleBadgeWhile: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleBadgeWhile: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  let i = 1;
  while (i <= veces) {
    const color = (i % 2 === 0) ? "primary" : "secondary";
    anadirBadge(i, color);
    i ++;
    contador ++;
  }
  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleBadgesWhile: completado con ${contador} ${textoRepeticion}`);
}

//badge do while
  function badgesDoWhile() {
  const veces = leerNumero("numero1");
  limpiarSalida();

  if (Number.isNaN(veces)) {
    mostrar("Escribe el número de repeticiones en la casilla 1.", "danger");
    console.warn("BucleBadgeDoWhile: falta el número de repeticiones.");
    return;
  }
  if (!Number.isInteger(veces)) {
    mostrar("El número de repeticiones debe ser un entero sin decimales.", "danger");
    console.warn("BucleBadgeDoWhile: el número tiene decimales.");
    return;
  }
  if (veces < 1) {
    mostrar("Debes ingresar al menos una repetición.", "danger");
    console.warn("BucleBadgeDoWhile: el número de repeticiones es menor a 1.");
    return;
  }
  if (veces > MAXIMO_REPETICIONES) {
    mostrar(`El número máximo de repeticiones es ${MAXIMO_REPETICIONES}.`, "danger");
    console.warn(`BucleBadgeDoWhile: no debe pasar el máximo de ${MAXIMO_REPETICIONES}.`);
    return;
  }
  let contador = 0;
  let i = 1;
  do {
    const color = (i % 2 === 0) ? "primary" : "secondary";
    anadirBadge(i, color);
    i ++;
    contador ++;
  } while (i <= veces);

  const textoRepeticion = contador === 1 ? "repetición" : "repeticiones";
  anadirLinea(`Total: ${contador} ${textoRepeticion}`);
  console.log(`bucleBadgesDoWhile: completado con ${contador} ${textoRepeticion}`);
}
