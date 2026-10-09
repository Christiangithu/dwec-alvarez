/*
  Tarea 3 · DWEC · Christian Alvarez
  Variables, tipos y conversiones.

  Cómo usar esta plantilla:
  · Hay una función por ejercicio. Cada una se ejecuta al pulsar su botón «Ejecutar» de index.html.
  · Escribe tu código DENTRO de cada función, donde pone TODO. Cuando lo hagas, borra el TODO.
  · Solo console.log() y alert(): el JavaScript no escribe nada dentro de la página.
  · let y const, nunca var. Comillas rectas (" o ').
*/

console.log("app.js cargado: pulsa «Ejecutar» en cada ejercicio");


// Ejercicio 1 · Variables y typeof
function ejercicio1() {
  console.log("--- Ejercicio 1 · Variables y typeof ---");

  // Ejemplo: una variable y su typeof en la consola
  const edad = 20;   // number
  console.log("edad =", edad, "→", typeof edad);

  // Declaracion de variables: string, boolean, null, bigint y undefined (como 10n).
  const nombre = "Christian";
  const esEstudiante = true;
  const valorNulo = null;
  const identificador = 100n;
  let asignaturaPendiente;


// Muestra en consola cada variable
  console.log("nombre =", nombre, "→", typeof nombre);
  console.log("esEstudiante =", esEstudiante, "→", typeof esEstudiante);
  console.log("valorNulo =", valorNulo, "→", typeof valorNulo);
  console.log("identificador =", identificador, "→", typeof identificador);
  console.log("asignaturaPendiente (inicial) =", asignaturaPendiente, "→", typeof asignaturaPendiente);

  // Valor para la variable let y comprobacion de su nuevo tipo
  asignaturaPendiente = "DWEC";
  console.log("asignaturaPendiente (tras reasignar) =", asignaturaPendiente, "→", typeof asignaturaPendiente);
}

// Ejercicio 2 · Conversiones explícitas
// Escribe el comentario «espero …» ANTES de ejecutar. Si fallas, no lo cambies: márcalo en la tabla de la página.
function ejercicio2() {
  console.log("--- Ejercicio 2 · Conversiones explícitas ---");

  // Ejemplo: una conversión, tu predicción y el resultado con su tipo
  const a = String(123);   // espero 123 como String
  console.log("String(123) →", a, typeof a);

  // Conversiones obligatorias con el resultado que espero:
  const b = Number("123");   // espero 123
  console.log('Number("123") →', b, typeof b);

  const c = Number("12abc"); // espero 12 pero falla, sale NaN
  console.log('Number("12abc") →', c, typeof c);

  const d = Number("");      // espero NaN pero falla, sale 0
  console.log('Number("") →', d, typeof d);

  const e = Number(true);    // espero 1
  console.log('Number(true) →', e, typeof e);

  const f = Boolean(0);      // espero false
  console.log('Boolean(0) →', f, typeof f);

  const g = Boolean("texto"); // espero true
  console.log('Boolean("texto") →', g, typeof g);

  const h = Boolean("");     // espero false
  console.log('Boolean("") →', h, typeof h);
}

// Ejercicio 3 · Coerción y comparaciones
function ejercicio3() {
  console.log("--- Ejercicio 3 · Coerción y comparaciones ---");

  // Ejemplo: una expresión que mezcla tipos
  console.log('"5" - 2 →', "5" - 2);   // espero 3

  // Cinco expresiones que mezclen tipos
  console.log('"5" + 2 →', "5" + 2);        // espero "52"
  console.log('"10" * "3" →', "10" * "3");  // espero 30
  console.log('true + 5 →', true + 5);      // espero 6
  console.log('"Pepe" - 2 →', "Pepe" - 2);  // espero NaN
  console.log('false == 0 →', false == 0);  // espero true

  // Ejemplo: la misma pareja comparada con == y con ===
  console.log('5 == "5" →', 5 == "5");     // espero true
  console.log('5 === "5" →', 5 === "5");   // espero false

  // Ejemplo con 0 y false
  console.log('0 == false →', 0 == false);   // espero true
  console.log('0 === false →', 0 === false); // espero false

  // Ejemplo con null y undefined
  console.log('null == undefined →', null == undefined);   // espero true
  console.log('null === undefined →', null === undefined); // espero false
}



// Ejercicio 4 · Tu ficha con plantillas de cadena
function ejercicio4() {
  console.log("--- Ejercicio 4 · Tu ficha con plantillas de cadena ---");

  // Tus datos, con const
  // Tus datos con const
  const nombre = "Christian Alvarez";
  const ciclo = "Desarrollo de Aplicaciones Web";
  const curso = "2.º DAW";
  const aficion = "senderismo y viajar";

  // Un dato que cambia, con let
  let horasEstudio = 30;
  horasEstudio += 5; 

  // La ficha con plantilla de cadena: backticks (`) y ${ }
  const ficha = `Soy ${nombre}, estudio ${ciclo} (${curso}), mis aficiónes son ${aficion}, esta semana he estudiado ${horasEstudio} horas.`;

  // Muestra con alert() y en la consola
  alert(ficha);
  console.log("Ficha:", ficha);

  //Ficha concatenada
  const fichaConMas = "Soy " + nombre + ", estudio " + ciclo + " (" + curso + "), mis aficiónes son " + aficion + ", esta semana he estudiado " + horasEstudio + " horas.";
  console.log("Ficha con operador +:", fichaConMas);

  //Comparación con ===
  const sonIguales = ficha === fichaConMas;
  console.log("Son iguales? (ficha === fichaConMas):", sonIguales);

  // Recuerda: el error de dar otro valor a una const se provoca en la consola del navegador, no aquí.
}
