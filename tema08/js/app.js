/*
  Tarea 8 · DWEC · Christian Alvarez
  Formulario de inscripción.

  Cómo usar esta plantilla:
  · Escribe tu código donde pone TODO y, cuando termines, borra el TODO.
  · Los ejercicios 1 a 3 son HTML: el formulario se valida y se envía solo, sin JavaScript.
  · Desde el ejercicio 4, la validación la haces tú: añade novalidate al <form>.
  · Los errores se escriben debajo de cada campo con mostrarError(); nada de alert().
  · Como en el tema 7: flechas en los callbacks. Dentro de ellos, this NO es el formulario:
    usa e.target o la constante form.
  · let y const, nunca var. Compara siempre con ===. Comillas rectas.
*/

console.log("app.js cargado");

const form = document.querySelector("#inscripcion");


// Mostrar y quitar los errores junto al campo
// Cada campo está en un <div class="mb-3"> con su <div class="invalid-feedback">
// ============================================================

// Ya está hecha: es el modelo
function mostrarError(campo, mensaje) {
  campo.classList.add("is-invalid");                         // borde rojo de Bootstrap
  const aviso = campo.closest(".mb-3").querySelector(".invalid-feedback");
  aviso.textContent = mensaje;
  aviso.classList.add("d-block");                            // visible también en los radio
}

function quitarError(campo) {
  if (campo.type === "radio") {
    const grupo = form.querySelectorAll(`[name="${campo.name}"]`);
    grupo.forEach((radio) => radio.classList.remove("is-invalid"));
  } else {
    campo.classList.remove("is-invalid");
  }

  const aviso = campo.closest(".mb-3").querySelector(".invalid-feedback");
  if (aviso) {
    aviso.textContent = "";
    aviso.classList.remove("d-block");
  }
}

// Lista de mensajes para los campos obligatorios
const OBLIGATORIOS = {
  nombre: "Escribe tu nombre y apellidos.",
  email: "Escribe tu correo electrónico.",
  email2: "Repite tu correo electrónico.",
  nacimiento: "Indica tu fecha de nacimiento.",
  modalidad: "Selecciona una modalidad.",
  taller: "Elige un taller de la tarde.",
  condiciones: "Tienes que aceptar las condiciones para inscribirte."
};

function mensajeDe(campo) {
  const v = campo.validity;

  if (v.valueMissing) {
    return OBLIGATORIOS[campo.name || campo.id] || "Este campo es obligatorio.";
  }
  if (v.customError) {
    return campo.validationMessage;
  }
  if (v.typeMismatch) {
    return "Escribe un correo electrónico válido (por ejemplo, ana@dominio.es).";
  }
  if (v.tooShort) {
    return `Escribe al menos ${campo.minLength} caracteres.`;
  }
  if (v.patternMismatch || v.rangeUnderflow || v.rangeOverflow) {
    return campo.title || "El formato o el valor introducido no es válido.";
  }

  return campo.validationMessage;
}

// Valida todos los campos antes de enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Validando formulario antes del envío...");
  comprobarCorreos();

  const campos = e.target.querySelectorAll("input, select, textarea");
  let primerError = null;

  campos.forEach((campo) => {
    if (campo.checkValidity()) {
      quitarError(campo);
    } else {
      mostrarError(campo, mensajeDe(campo));
      if (!primerError) {
        primerError = campo;
      }
    }
  });

  if (primerError) {
    console.log("Formulario con errores. Foco en:", primerError.id || primerError.name);
    primerError.focus();
    return;
  }

  console.log("Formulario válido. Enviando por GET...");
  e.target.submit();
});

// Muestra la cantidad de caracteres escritos en comentarios
const comentarios = document.querySelector("#comentarios");
const contador = document.querySelector("#contador");

comentarios.addEventListener("input", () => {
  contador.textContent = comentarios.value.length;
});

// Actualiza el nivel elegido con el control de rango
const nivel = document.querySelector("#nivel");
const valorNivel = document.querySelector("#valorNivel");

nivel.addEventListener("input", () => {
  valorNivel.textContent = nivel.value;
});

// Comprueba que los dos correos sean iguales
const email = document.querySelector("#email");
const email2 = document.querySelector("#email2");

function comprobarCorreos() {
  if (email2.value !== "" && email2.value !== email.value) {
    email2.setCustomValidity("Los dos correos no coinciden.");
  } else {
    email2.setCustomValidity("");
  }
}

email.addEventListener("input", () => {
  comprobarCorreos();
  if (email2.checkValidity()) {
    quitarError(email2);
  } else if (email2.value !== "") {
    mostrarError(email2, mensajeDe(email2));
  }
});

email2.addEventListener("input", () => {
  comprobarCorreos();
});

// Quita el error de un campo cuando su valor ya sea válido
const todosLosCampos = form.querySelectorAll("input, select, textarea");

todosLosCampos.forEach((campo) => {
  campo.addEventListener("input", () => {
    if (campo.checkValidity()) {
      quitarError(campo);
    }
  });
});

// Restablece los errores y los contadores al borrar el formulario
form.addEventListener("reset", () => {
  console.log("Formulario reiniciado");
  todosLosCampos.forEach((campo) => {
    campo.setCustomValidity("");
    quitarError(campo);
  });
  contador.textContent = "0";
  valorNivel.textContent = "5";
  document.querySelector("#resumen").textContent = "";
  document.querySelector("#avisoResumen").textContent = "";
});

// Para crear el resumen de los datos enviados con FormData
const btnResumen = document.querySelector("#verResumen");
const listaResumen = document.querySelector("#resumen");
const avisoResumen = document.querySelector("#avisoResumen");

btnResumen.addEventListener("click", () => {
  const datos = new FormData(form);
  listaResumen.textContent = "";
  let total = 0;

  for (const [campo, valor] of datos) {
    total++;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start gap-2";

    const clave = document.createElement("strong");
    clave.textContent = campo;

    const dato = document.createElement("span");
    dato.className = "text-end text-break";
    dato.textContent = valor.trim() === "" ? "(vacío)" : valor;

    li.append(clave, dato);
    listaResumen.appendChild(li);
  }

  console.log("Resumen generado con FormData:", Object.fromEntries(datos));
  avisoResumen.textContent = `${total} datos. «Repite el correo» no sale porque no tiene name, y las condiciones o el taller solo salen si están marcados.`;
});