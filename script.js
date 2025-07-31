// Mostrar/ocultar menú desplegable
function toggleMenu(id) {
  document.querySelectorAll('.menu-dropdown').forEach(menu => {
    if (menu.id !== id) menu.classList.remove('visible');
  });
  document.getElementById(id).classList.toggle('visible');
}

// Delegación de clic para menú y cierre al clic fuera
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.menu-toggle');
  if (toggle) {
    const menuId = toggle.getAttribute('data-menu');
    toggleMenu(menuId);
  } else {
    document.querySelectorAll('.menu-dropdown').forEach(menu => {
      menu.classList.remove('visible');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const input = document.getElementById("producto");
  const lista = document.getElementById("lista");
  const comprados = document.getElementById("comprados");
  const btnBorrarComprados = document.getElementById("borrar-comprados");
  const btnMarcarTodos = document.getElementById("marcar-todos");
  const btnMarcarSel = document.getElementById("marcar-seleccionados");

  const pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
  const hechos = JSON.parse(localStorage.getItem("comprados")) || [];

  function guardar() {
    const pend = Array.from(lista.children).map(li => li.dataset.text);
    const comp = Array.from(comprados.children).map(li => li.dataset.text);
    localStorage.setItem("pendientes", JSON.stringify(pend));
    localStorage.setItem("comprados", JSON.stringify(comp));
  }

  function crearElemento(texto, comprado = false) {
    const li = document.createElement("li");
    li.textContent = texto;
    li.dataset.text = texto;

    if (comprado) {
      li.classList.add("comprado");
      const borrarBtn = document.createElement("button");
      borrarBtn.classList.add("boton-borrar");
      borrarBtn.textContent = "🗑";
      borrarBtn.addEventListener("click", e => {
        e.stopPropagation();
        comprados.removeChild(li);
        guardar();
      });
      li.appendChild(borrarBtn);
      comprados.appendChild(li);
    } else {
      // checkbox para selección múltiple
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("sel-checkbox");
      li.prepend(checkbox);
      lista.appendChild(li);
    }

    li.addEventListener("click", () => {
      if (li.classList.contains("comprado")) {
        li.classList.remove("comprado");
        const btn = li.querySelector(".boton-borrar");
        if (btn) btn.remove();
        comprados.removeChild(li);
        lista.appendChild(li);
      } else {
        li.classList.add("comprado");
        const borrarBtn = document.createElement("button");
        borrarBtn.classList.add("boton-borrar");
        borrarBtn.textContent = "🗑";
        borrarBtn.addEventListener("click", e => {
          e.stopPropagation();
          comprados.removeChild(li);
          guardar();
        });
        li.appendChild(borrarBtn);
        lista.removeChild(li);
        comprados.appendChild(li);
      }
      guardar();
    });
  }

  pendientes.forEach(item => crearElemento(item, false));
  hechos.forEach(item => crearElemento(item, true));

  formulario.addEventListener("submit", e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto) {
      crearElemento(texto, false);
      input.value = "";
      guardar();
    }
  });

  btnBorrarComprados.addEventListener("click", () => {
    comprados.innerHTML = "";
    guardar();
  });

  btnMarcarTodos.addEventListener("click", () => {
    Array.from(lista.children).forEach(li => {
      if (!li.classList.contains("comprado")) li.click();
    });
    guardar();
  });

  btnMarcarSel.addEventListener("click", () => {
    Array.from(lista.querySelectorAll("li")).forEach(li => {
      const cb = li.querySelector(".sel-checkbox");
      if (cb && cb.checked && !li.classList.contains("comprado")) li.click();
    });
    guardar();
  });
});
