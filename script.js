document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const input = document.getElementById("producto");
  const lista = document.getElementById("lista");
  const comprados = document.getElementById("comprados");
  const btnBorrarComprados = document.getElementById("borrar-comprados");
  const btnMarcarTodos = document.getElementById("marcar-todos");

  const pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  const hechos = JSON.parse(localStorage.getItem("comprados")) || [];

  function guardar() {
    const pendientesArr = Array.from(lista.children).map(li => li.dataset.text);
    const compradosArr = Array.from(comprados.children).map(li => li.dataset.text);
    localStorage.setItem("pendientes", JSON.stringify(pendientesArr));
    localStorage.setItem("comprados", JSON.stringify(compradosArr));
  }

  function crearElemento(texto, comprado = false) {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = texto;
    nuevoElemento.dataset.text = texto;

    if (comprado) {
      nuevoElemento.classList.add("comprado");
      const borrarBtn = document.createElement("button");
      borrarBtn.classList.add("boton-borrar");
      borrarBtn.textContent = "🗑";
      borrarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        comprados.removeChild(nuevoElemento);
        guardar();
      });
      nuevoElemento.appendChild(borrarBtn);
      comprados.appendChild(nuevoElemento);
    } else {
      lista.appendChild(nuevoElemento);
    }

    nuevoElemento.addEventListener("click", () => {
      if (nuevoElemento.classList.contains("comprado")) {
        nuevoElemento.classList.remove("comprado");
        const borrarBtn = nuevoElemento.querySelector(".boton-borrar");
        if (borrarBtn) borrarBtn.remove();
        comprados.removeChild(nuevoElemento);
        lista.appendChild(nuevoElemento);
      } else {
        nuevoElemento.classList.add("comprado");
        const borrarBtn = document.createElement("button");
        borrarBtn.classList.add("boton-borrar");
        borrarBtn.textContent = "🗑";
        borrarBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          comprados.removeChild(nuevoElemento);
          guardar();
        });
        nuevoElemento.appendChild(borrarBtn);
        lista.removeChild(nuevoElemento);
        comprados.appendChild(nuevoElemento);
      }
      guardar();
    });
  }

  pendientes.forEach(item => crearElemento(item, false));
  hechos.forEach(item => crearElemento(item, true));

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const texto = input.value.trim();
    if (texto !== "") {
      crearElemento(texto);
      input.value = "";
      guardar();
    }
  });

  btnBorrarComprados.addEventListener("click", () => {
    comprados.innerHTML = "";
    guardar();
  });

  btnMarcarTodos.addEventListener("click", () => {
    const items = Array.from(lista.children);
    items.forEach(li => {
      li.classList.add("comprado");
      const borrarBtn = document.createElement("button");
      borrarBtn.classList.add("boton-borrar");
      borrarBtn.textContent = "🗑";
      borrarBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        comprados.removeChild(li);
        guardar();
      });
      li.appendChild(borrarBtn);
      lista.removeChild(li);
      comprados.appendChild(li);
    });
    guardar();
  });
});
