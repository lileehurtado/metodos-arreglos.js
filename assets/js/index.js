let idCounter = 0;

const tareas = [
    { id: idCounter++, nombre: "Ordenar"},
    { id: idCounter++, nombre: "Limpiar"},
    { id: idCounter++, nombre: "Estudiar"}
];

document.addEventListener('DOMContentLoaded', function() {
    const listaTareas = document.getElementById('lista-tareas');
    const totalTareas = document.getElementById('total-tareas');
    const tareasCompletadas = document.getElementById('tareas-completadas');

    tareas.forEach(function(tarea) {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.innerHTML = `
            <div>${tarea.id}</div>
            <div class="tarea-text">${tarea.nombre}</div>
            <input type="checkbox" class="checkbox-tarea" data-id="${tarea.id}" ${tarea.completada ? "checked" : ""}>
            <button class="boton-borrar"> x </button>
        `;

        nuevaTarea.querySelector('.checkbox-tarea').addEventListener('change', function(event) {
            const checkbox = event.target;
            const tarea = checkbox.parentNode;
            if (checkbox.checked) {
                tarea.classList.add('completada');
            } else {
                tarea.classList.remove('completada');
            }
            actualizarContadorTareas();
        });

        nuevaTarea.querySelector('.boton-borrar').addEventListener('click', function() {
            listaTareas.removeChild(nuevaTarea);
            actualizarContadorTareas();
        });

        listaTareas.appendChild(nuevaTarea);
    });

    function actualizarContadorTareas() {
        const total = listaTareas.children.length;
        const completadas = Array.from(listaTareas.children).filter(tarea => tarea.classList.contains('completada')).length;
        totalTareas.textContent = total;
        tareasCompletadas.textContent = completadas;
    }

    actualizarContadorTareas(); 
});

document.getElementById('formulario-agregar-tarea').addEventListener('submit', function(event) {
    event.preventDefault();
    const entradaNuevaTarea = document.getElementById('entrada-nueva-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const totalTareas = document.getElementById('total-tareas');
    const tareasCompletadas = document.getElementById('tareas-completadas');

    if (entradaNuevaTarea.value.trim() === '') {
        alert('Por favor ingrese una tarea.');
        return;
    }

    const nuevaTarea = document.createElement('li');
    const tareaID = idCounter++;
    nuevaTarea.innerHTML = `
        <div>${tareaID}</div>
        <div class="tarea-text">${entradaNuevaTarea.value}</div>
        <input type="checkbox" class="checkbox-tarea" data-id="${tareaID}">
        <button class="boton-borrar"> x </button>
    `;
    nuevaTarea.querySelector('.checkbox-tarea').addEventListener('change', function(event) {
        const checkbox = event.target;
        const tarea = checkbox.parentNode;
        if (checkbox.checked) {
            tarea.classList.add('completada');
            agregarTareaCompletada(tarea.querySelector('.tarea-text').textContent);
        } else {
            tarea.classList.remove('completada');
            removerTareaCompletada(tarea.querySelector('.tarea-text').textContent);
        }
        actualizarContadorTareas();
    });

    nuevaTarea.querySelector('.boton-borrar').addEventListener('click', function() {
        listaTareas.removeChild(nuevaTarea);
        actualizarContadorTareas();
    });

    listaTareas.appendChild(nuevaTarea);
    entradaNuevaTarea.value = '';
    actualizarContadorTareas();
});

function actualizarContadorTareas() {
    const listaTareas = document.getElementById('lista-tareas');
    const totalTareas = document.getElementById('total-tareas');
    const tareasCompletadas = document.getElementById('tareas-completadas');

    const total = listaTareas.children.length;
    const completadas = Array.from(listaTareas.children).filter(tarea => tarea.classList.contains('completada')).length;

    totalTareas.textContent = total;
    tareasCompletadas.textContent = completadas;
}

function agregarTareaCompletada(tareaText) {
    const tareasCompletadasList = document.getElementById('tareas-completadas-lista');
    const nuevaTareaCompletada = document.createElement('div');
    nuevaTareaCompletada.textContent = tareaText;
    tareasCompletadasList.appendChild(nuevaTareaCompletada);
}

function removerTareaCompletada(tareaText) {
    const tareasCompletadasList = document.getElementById('tareas-completadas-lista');
    const tareasCompletadas = tareasCompletadasList.querySelectorAll('div');
    tareasCompletadas.forEach(completada => {
        if (completada.textContent === tareaText) {
            tareasCompletadasList.removeChild(completada);
        }
    });
}