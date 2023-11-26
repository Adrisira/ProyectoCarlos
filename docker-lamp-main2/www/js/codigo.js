"use strict";

var oRrhh = new Rrhh();

registrarEventos();

function registrarEventos() {
    // Menú principal
    document
        .querySelector("#mnuAltaDepartamento")
        .addEventListener("click", mostrarFormulario);
    
    document
        .querySelector("#mnuAltaEmpleado")
        .addEventListener("click", mostrarFormulario);
    
    document
        .querySelector("#mnuListadoDepartamento")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoEmpleado")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarDepartamento")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarEmpleado")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoEmpleadoPorDepartamento")
        .addEventListener("click", mostrarFormulario);
    //Botones de los formularios
    frmAltaDepartamento.btnAceptarAltaDepartamento.addEventListener("click", procesarAltaDepartamento);
    frmAltaEmpleado.btnAceptarAltaEmpleado.addEventListener("click", procesarAltaEmpleado);
    frmBuscarDepartamento.btnBuscarDepartamento.addEventListener("click", procesarBuscarDepartamento);
    frmBuscarEmpleado.btnBuscarEmpleado.addEventListener("click", procesarBuscarEmpleado);
    frmListadoEmpleadoDepartamento.btnAceptarListadoPorDepartamento.addEventListener("click", procesarListadoPorDepartamento);
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
            actualizarDesplegableDepartamento(undefined);
            break;
        case "mnuListadoDepartamento":
            cargarListadoDepartamentos();
            break;
        case "mnuListadoEmpleado":
            cargarListaEmpleados();
            break;
        case "mnuBuscarDepartamento":
            frmBuscarDepartamento.style.display = "block";
            break;
        case "mnuBuscarEmpleado":
            frmBuscarEmpleado.style.display = "block";
            break;
        case "mnuListadoEmpleadoPorDepartamento":
            frmListadoEmpleadoDepartamento.style.display = "block";
            actualizarDesplegableDepartamento(undefined);
            break;
    }
}

function ocultarFormularios() {
    frmAltaDepartamento.style.display = "none";
    frmAltaEmpleado.style.display = "none";
    contenedorListados.style.display = "none";
    contenedorBusquedas.style.display = "none";
    frmBuscarDepartamento.style.display = "none";
    frmBuscarEmpleado.style.display = "none";
    frmListadoEmpleadoDepartamento.style.display = "none";
}
function ocultarContenido() {
    contenedorPrincipal.style.display = "none";
    contenedorListados.style.display = "none";
    contenedorBusquedas.style.display = "none";
}
function mostrarContenido() {
    contenedorPrincipal.style.display = "block";
    contenedorListados.style.display = "none";
    contenedorBusquedas.style.display = "none";
    ocultarFormularios();
}
async function ProcesarBorrarDepartamento(oEvento) {
    let boton = oEvento.target;
    let idDepartamento = boton.dataset.iddepartamento;

    let respuesta = await oRrhh.borrarDepartamento(idDepartamento);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#contenedorBusquedas").innerHTML = "";
    }

}
async function ProcesarBorrarEmpleado(oEvento) {
    let boton = oEvento.target;
    let idEmpleado = boton.dataset.idempleado;

    let respuesta = await oRrhh.borrarDepartamento(idEmpleado);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#contenedorBusquedas").innerHTML = "";
    }

}

async function procesarAltaDepartamento() {
    if (validarAltaDepartamento()) {
        let nombre = frmAltaDepartamento.txtNombre.value.trim();
        let localizacion = frmAltaDepartamento.txtLocalizacion.value.trim();
        let manager = frmAltaDepartamento.txtManager.value.trim();

        let respuesta = await oRrhh.altaDepartamento(new Departamento(null, nombre, localizacion, manager));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaDepartamento.reset();
            // Ocultar el formulario
            frmAltaDepartamento.style.display = "none";
            frmAltaDepartamento.style.display = "block";
        }
    }

}
function validarAltaDepartamento() {
    let nombre = frmAltaDepartamento.txtNombre.value.trim();
    let localizacion = frmAltaDepartamento.txtLocalizacion.value.trim();
    let manager = frmAltaDepartamento.txtManager.value.trim();
    let valido = true;
    let errores = "";

    if (nombre.length == 0 || localizacion.length == 0 || manager.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }
    return valido;

}

async function procesarAltaEmpleado() {
    let nombre = frmAltaEmpleado.txtNombre.value.trim();
    let apellidos = frmAltaEmpleado.txtApellidos.value.trim();
    let email = frmAltaEmpleado.txtEmail.value.trim();
    let idDepartamento = parseInt(frmAltaEmpleado.lstAltaEmpleado.value.trim());

    // Validar datos del formulario
    if (validarAltaEmpleado()) {
        let respuesta = await oRrhh.altaEmpleado(new Empleado(null, nombre, apellidos, email, idDepartamento)); 
        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaComponente.reset();
            // Ocultar el formulario
            //frmAltaComponente.style.display = "none";
            //frmAltaDepartamento.style.display = "block";
        }

    }
}


function validarAltaEmpleado(){
    let nombre = frmAltaEmpleado.txtNombre.value.trim();
    let apellidos = frmAltaEmpleado.txtApellidos.value.trim();
    let email = frmAltaEmpleado.txtEmail.value.trim();
    let idDepartamento = frmAltaEmpleado.lstAltaEmpleado.value;
    let valido = true;
    let errores = "";

    

    if (nombre.length == 0 || apellidos.length == 0 || email.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

async function actualizarDesplegableDepartamento(idDepartamentoSeleccionado){
    let respuesta = await oRrhh.get_departamentos();
    let options = "";

    for (let departments of respuesta.datos) {
        if (idDepartamentoSeleccionado && idDepartamentoSeleccionado == departments.department_id) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + departments.department_id  + "' >" + departments.department_id + " - " + departments.department_name + "</option>";
        } else {
            options += "<option value='" + departments.department_id  + "' >" + departments.department_id + " - " + departments.department_name + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    //frmListadoTipo.lstTipo.innerHTML = options;
    // Aprovecho y actualizo todos los desplegables se vea o no el formulario
    //frmModificarComponente.lstModTipo.innerHTML = options;
    frmAltaEmpleado.lstAltaEmpleado.innerHTML = options;
    frmListadoEmpleadoDepartamento.lstDepartamento.innerHTML = options;

}

async function cargarListadoDepartamentos(){
    contenedorListados.style.display = "block";
    document.querySelector("#contenedorListados").innerHTML = await oRrhh.listadoDepartamentos();
    
}

async function cargarListaEmpleados(){
    contenedorListados.style.display = "block";
    document.querySelector("#contenedorListados").innerHTML = await oRrhh.listadoEmpleados();
    
}

function validarBuscarDepartamento() {
    let idDepartamento = parseInt(frmBuscarDepartamento.txtIdDepartamento.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(idDepartamento)) {
        valido = false;
        errores += "El identificador de departamento debe ser numérico";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

async function procesarBuscarDepartamento() {
    if (validarBuscarDepartamento()) {
        let idDepartamento = parseInt(frmBuscarDepartamento.txtIdDepartamento.value.trim());

        let respuesta = await oRrhh.buscarDepartamento(idDepartamento);

        if (!respuesta.error) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#contenedorBusquedas");

            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDDEPARTAMENTO</th><th>NOMBRE</th><th>LOCALIZACION</th><th>MANAGER</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + respuesta.datos.department_id + "</td>"
            tablaSalida += "<td>" + respuesta.datos.department_name + "</td>"
            tablaSalida += "<td>" + respuesta.datos.location + "</td>"
            tablaSalida += "<td>" + respuesta.datos.manager + "</td>"
            tablaSalida += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarDepartamento' data-iddepartamento='" + respuesta.datos.department_id + "'></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarDepartamento").addEventListener("click", ProcesarBorrarDepartamento);

        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}

function validarBuscarEmpleado() {
    let idEmpleado = parseInt(frmBuscarEmpleado.txtIdEmpleado.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(idEmpleado)) {
        valido = false;
        errores += "El identificador de empleado debe ser numérico";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

async function procesarBuscarEmpleado() {
    if (validarBuscarEmpleado()) {
        let idEmpleado = parseInt(frmBuscarEmpleado.txtIdEmpleado.value.trim());

        let respuesta = await oRrhh.buscarEmpleado(idEmpleado);

        if (!respuesta.error) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#contenedorBusquedas");

            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDEMPLEADO</th><th>NOMBRE</th><th>APELLIDO</th><th>EMAIL</th><th>IDDEPARTAMENTO</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + respuesta.datos.employee_id + "</td>"
            tablaSalida += "<td>" + respuesta.datos.first_name + "</td>"
            tablaSalida += "<td>" + respuesta.datos.last_name + "</td>"
            tablaSalida += "<td>" + respuesta.datos.email + "</td>"
            tablaSalida += "<td>" + respuesta.datos.department_id + "</td>"
            tablaSalida += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarEmpleado' data-idempleado='" + respuesta.datos.employee_id + "'></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarEmpleado").addEventListener("click", ProcesarBorrarEmpleado);

        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }

    
}
async function procesarListadoPorDepartamento(){
    let idDepartamento = parseInt(frmListadoEmpleadoDepartamento.lstDepartamento.value.trim());

    let respuesta = await oRrhh.listadoPorDepartamento(idDepartamento);

    let tabla = "<table class='table table-striped' id='listadoPorDepartamento'>";
    tabla += "<thead><tr><th>IDEMPLEADO</th><th>NOMBRE</th><th>APELLIDO</th><th>EMAIL</th><th>IDDEPARTAMENTO</th><th>ACCION</th></tr></thead><tbody>";

    for (let employees of respuesta.datos) {
        tabla += "<tr><td>" + employees.employee_id + "</td>";
        tabla += "<td>" + employees.first_name + "</td>";
        tabla += "<td>" + employees.last_name + "</td>";
        tabla += "<td>" + employees.email + "</td>";
        tabla += "<td>" + employees.department_id + "</td></tr>";

        //tabla += "<td><button class='btn btn-primary' data-componente='" + JSON.stringify(componente) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#contenedorBusquedas").innerHTML = tabla;
    document.querySelector("#contenedorBusquedas").style.display = "block";
    // Agregar manejador de evento para toda la tabla
    //document.querySelector("#listadoPorDepartamento").addEventListener('click', procesarBotonEditarComponente);

}
