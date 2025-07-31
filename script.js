// Menús desplegables
function toggleMenu(id) {
  document.querySelectorAll('.menu-dropdown').forEach(menu => {
    if (menu.id !== id) menu.classList.remove('visible');
  });
  document.getElementById(id).classList.toggle('visible');
}

document.addEventListener('click', e => {
  const toggle = e.target.closest('.menu-toggle');
  if (toggle) {
    toggleMenu(toggle.dataset.menu);
  } else {
    document.querySelectorAll('.menu-dropdown').forEach(menu => menu.classList.remove('visible'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const input = document.getElementById('producto');
  const lista = document.getElementById('lista');
  const comprados = document.getElementById('comprados');
  const btnBorrarComprados = document.getElementById('borrar-comprados');
  const btnMarcarTodos = document.getElementById('marcar-todos');
  const btnMarcarSel = document.getElementById('marcar-seleccionados');

  let items = JSON.parse(localStorage.getItem('items')) || [];

  function guardar() {
    localStorage.setItem('items', JSON.stringify(items));
  }

  function renderList() {
    lista.innerHTML = '';
    comprados.innerHTML = '';
    items.forEach(item => {
      crearElemento(item);
    });
  }

  function crearElemento({ id, texto, comprado }) {
    const li = document.createElement('li');
    li.dataset.text = texto;
    li.dataset.id = id;

    if (!comprado) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.classList.add('select-btn');
      const idx = id;
      btn.textContent = idx;
      btn.dataset.index = idx;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const sel = btn.classList.toggle('selected');
        btn.textContent = sel ? '✔️' : btn.dataset.index;
        li.classList.toggle('selected', sel);
      });
      li.appendChild(btn);
      li.appendChild(document.createTextNode(texto));
      lista.appendChild(li);
    } else {
      li.textContent = texto;
      li.classList.add('comprado');
      const borrarBtn = document.createElement('button');
      borrarBtn.classList.add('boton-borrar');
      borrarBtn.textContent = '🗑';
      borrarBtn.addEventListener('click', e => {
        e.stopPropagation();
        items = items.filter(it => it.id !== id);
        renderList();
        guardar();
      });
      li.appendChild(borrarBtn);
      comprados.appendChild(li);
    }

    li.addEventListener('click', () => {
      const item = items.find(it => it.id === id);
      if (item) {
        item.comprado = !item.comprado;
        renderList();
        guardar();
      }
    });
  }

  renderList();

  formulario.addEventListener('submit', e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto) {
      const maxId = items.length ? Math.max(...items.map(it => it.id)) : 0;
      const nuevo = { id: maxId + 1, texto, comprado: false };
      items.push(nuevo);
      renderList();
      guardar();
      input.value = '';
    }
  });

  btnBorrarComprados.addEventListener('click', () => {
    items = items.filter(it => !it.comprado);
    renderList();
    guardar();
  });

  btnMarcarTodos.addEventListener('click', () => {
    items.forEach(it => {
      if (!it.comprado) it.comprado = true;
    });
    renderList();
    guardar();
  });

  btnMarcarSel.addEventListener('click', () => {
    const seleccionados = Array.from(lista.querySelectorAll('li.selected'));
    seleccionados.forEach(li => {
      const id = parseInt(li.dataset.id);
      const item = items.find(it => it.id === id);
      if (item) item.comprado = true;
    });
    renderList();
    guardar();
  });
});
