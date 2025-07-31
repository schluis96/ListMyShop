document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const input = document.getElementById("producto");
  const lista = document.getElementById("lista");
  const comprados = document.getElementById("comprados");

  // Función para crear un nuevo elemento en la lista
  function crearElemento(texto, comprado = false) {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = texto;

    // Aplicar clase y añadir a la lista correspondiente
    if (comprado) {
      nuevoElemento.classList.add("comprado");
      comprados.appendChild(nuevoElemento);
    } else {
      lista.appendChild(nuevoElemento);
    }

    // Al hacer clic: alternar entre comprado y no comprado
    nuevoElemento.addEventListener("click", () => {
      if (nuevoElemento.classList.contains("comprado")) {
        nuevoElemento.classList.remove("comprado");
        comprados.removeChild(nuevoElemento);
        lista.appendChild(nuevoElemento);
      } else {
        nuevoElemento.classList.add("comprado");
        lista.removeChild(nuevoElemento);
        comprados.appendChild(nuevoElemento);
      }
    });
  }

  // Evento al enviar el formulario
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = input.value.trim();

    if (texto !== "") {
      crearElemento(texto);
      input.value = "";
    }
  });
});
