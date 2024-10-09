// seleccionar el botón y el contenedor
const boton = document.getElementById('crearDiv');
const contenedor = document.getElementById('contenedorPrincipal');

// crear una nueva nota
function crearNota(titulo = '', texto = '', actualizarLocalStorage = true) {
  const nuevaNota = document.createElement('div');
  nuevaNota.className = 'contenedor';

  // Crear el input para el título dentro de la nota
  const inputTitulo = document.createElement('input');
  inputTitulo.type = 'text';
  inputTitulo.className = 'titulo-input';
  inputTitulo.value = titulo;
  inputTitulo.placeholder = 'Título';

  // Crear el textarea para el contenido de la nota
  const inputTexto = document.createElement('textarea');
  inputTexto.className = 'texto-input';
  inputTexto.placeholder = 'Escribe tu nota';
  inputTexto.value = texto;

  // Crear el botón de cerrar (X)
  const botonCerrar = document.createElement('button');
  botonCerrar.className = 'boton-cerrar';
  botonCerrar.textContent = 'X';

  // Funcionalidad para eliminar la nota
  botonCerrar.addEventListener('click', function() {
    contenedor.removeChild(nuevaNota); // Eliminar la nota del contenedor
    guardarNotas(); // Actualizar el localStorage después de eliminar
  });

  // Crear el botón "Guardar cambios"
  const botonGuardar = document.createElement('button');
  botonGuardar.className = 'guardar-btn';
  botonGuardar.textContent = 'Guardar cambios';

  // Funcionalidad para guardar los cambios en el localStorage
  botonGuardar.addEventListener('click', function() {
    guardarNotas(); // Guardar todas las notas en el localStorage
    alert('Cambios guardados');
  });

  // Añadir el input del título, el textarea, el botón de cerrar y el botón de guardar al div de la nota
  nuevaNota.appendChild(botonCerrar);
  nuevaNota.appendChild(inputTitulo);
  nuevaNota.appendChild(inputTexto);
  nuevaNota.appendChild(botonGuardar);

  // Añadir la nueva nota al contenedor principal
  contenedor.appendChild(nuevaNota);

  // Actualizar el localStorage si se solicita (solo cuando se crean nuevas notas)
  if (actualizarLocalStorage) {
    guardarNotas();
  }
}

// guardar en localstore
function guardarNotas() {
  const notas = [];
  const todasLasNotas = document.querySelectorAll('.contenedor');
  todasLasNotas.forEach(nota => {
    const titulo = nota.querySelector('.titulo-input').value;
    const texto = nota.querySelector('.texto-input').value;
    notas.push({ titulo, texto });
  });
  // guardamos todas las notas en localstore
  localStorage.setItem('notas', JSON.stringify(notas));
}

// Función para cargar las notas desde el localStorage
function cargarNotas() {
  const notasGuardadas = JSON.parse(localStorage.getItem('notas')) || [];

  notasGuardadas.forEach(nota => {
    crearNota(nota.titulo, nota.texto, false); // Creamos cada nota guardada
  });
}

// Cargar las notas al inicio cuando se carga la página
cargarNotas();

// Escuchar el click para crear una nueva nota
boton.addEventListener('click', function() {
  crearNota();
});
