"use strict";

var oRrhh = new Rrhh();

registrarEventos();

function registrarEventos() {
    document
        .querySelector("#mnuAltaDepartamento")
        .addEventListener("click", mostrarFormulario);
    
    document
        .querySelector("#mnuAltaEmpleado")
        .addEventListener("click", mostrarFormulario);
    
    frmAltaDepartamento.btnAceptarAltaDepartamento.addEventListener("click", procesarAltaDepartamento);
    frmAltaEmpleado.btnAceptarAltaEmpleado.addEventListener("click", procesarAltaEmpleado);
    inicio.addEventListener("click", mostrarContenido);
}

function mostrarFormulario(oeRrhh) {
    let opcionMenu = oeRrhh.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();
    ocultarContenido();

    switch (opcionMenu) {
        case "mnuAltaDepartamento":
            frmAltaDepartamento.style.display = "block";
            break;
        case "mnuAltaEmpleado":
            frmAltaEmpleado.style.display = "block";
            break;
    }
}

function ocultarFormularios() {
    frmAltaDepartamento.style.display = "none";
    frmAltaEmpleado.style.display = "none";
}
function ocultarContenido() {
    contenedorPrincipal.style.display = "none";
}
function mostrarContenido() {
    contenedorPrincipal.style.display = "block";
    ocultarFormularios();
}

async function procesarAltaDepartamento() {
    if (validarAltaDepartamento()) {
        let nombre = frmAltaDepartamento.txtNombre.value.trim();
        let localizacion = frmAltaDepartamento.txtLocalizacion.value.trim();

        let respuesta = await oRrhh.altaDepartamento(new Departamento(null, nombre, localizacion, null));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaDepartamento.reset();
            // Ocultar el formulario
            frmAltaDepartemento.style.display = "none";
        }
    }

}
function validarAltaDepartamento() {
    let nombre = frmAltaDepartamento.txtNombre.value.trim();
    let localizacion = frmAltaDepartamento.txtLocalizacion.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0 || localizacion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

function procesarAltaEmpleado() {
}
