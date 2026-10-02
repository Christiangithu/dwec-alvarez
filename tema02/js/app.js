// Funcion 1: Saludo
function saludar() {
  alert("Hola! Diego");
  console.log("Se ha ejecutado la función saludar() correctamente.");
}

// Funcion 2: Error
function simularError() {
  // Error en la consola
  console.error("Error crítico: Falla la conexión");
}

// Funcion 3: Nombre del navegador
function queNavegadorSoy() {
  var agenteUsuario = navigator.userAgent;
  alert("Tu navegador es:\n" + agenteUsuario);
  console.warn("Información del usuario: " + agenteUsuario);
}