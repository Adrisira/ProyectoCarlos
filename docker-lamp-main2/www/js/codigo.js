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
    frmModificarDepartamento.btnAceptarModDepartamento.addEventListener("click", procesarModificarDepartamento);
    frmModificarEmpleado.btnAceptarModEmpleado.addEventListener("click", procesarModificarEmpleado);
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
    frmModificarEmpleado.style.display = "none";
    frmModificarDepartamento.style.display = "none";
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
    let iddepartamento = parseInt(frmAltaEmpleado.lstAltaEmpleado.value.trim());

    // Validar datos del formulario
    if (validarAltaEmpleado()) {
        let respuesta = await oRrhh.altaEmpleado(new Empleado(null, nombre, apellidos, email, iddepartamento)); 
        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaEmpleado.reset();
            // Ocultar el formulario
            frmAltaEmpleado.style.display = "none";
            frmAltaEmpleado.style.display = "block";
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
    frmModificarEmpleado.lstModIdDepartamento.innerHTML = options;

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
            let tablaSalida = "<table class='table' id='listadoTablaDepartamento'>";
            tablaSalida += "<thead><tr><th>IDDEPARTAMENTO</th><th>NOMBRE</th><th>LOCALIZACION</th><th>MANAGER</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + respuesta.datos.department_id + "</td>"
            tablaSalida += "<td>" + respuesta.datos.department_name + "</td>"
            tablaSalida += "<td>" + respuesta.datos.location + "</td>"
            tablaSalida += "<td>" + respuesta.datos.manager + "</td>"
            tablaSalida += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarDepartamento' data-iddepartamento='" + respuesta.datos.department_id + "'></td>";
            tablaSalida += "<td><button class='btn btn-primary' data-departamento='" + JSON.stringify(respuesta) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
            tablaSalida += "</tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarDepartamento").addEventListener("click", ProcesarBorrarDepartamento);
            document.querySelector("#listadoTablaDepartamento").addEventListener("click", procesarBotonEditarDepartamento);

        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}
function procesarBotonEditarDepartamento(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de componentes
        frmModificarDepartamento.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del componente
        let departamento = JSON.parse(boton.dataset.departamento);

        frmModificarDepartamento.txtModIdDepartamento.value = departamento.datos.department_id;
        frmModificarDepartamento.txtModNombreDepartamento.value = departamento.datos.department_name;
        frmModificarDepartamento.txtModLocalizacion.value = departamento.datos.location;
        frmModificarDepartamento.txtModManager.value = departamento.datos.manager;


    }
}

async function procesarModificarDepartamento(){
    let idDepartamento = frmModificarDepartamento.txtModIdDepartamento.value.trim();
    let nombre = frmModificarDepartamento.txtModNombreDepartamento.value.trim();
    let localizacion = frmModificarDepartamento.txtModLocalizacion.value.trim();
    let manager = frmModificarDepartamento.txtModManager.value.trim();
    
    // Validar datos del formulario
    if (validarModDepartamento()) {
        let respuesta = await oRrhh.modificarDepartamento(new Departamento(idDepartamento, nombre, localizacion, manager));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarDepartamento.reset();
            // Ocultar el formulario
            frmModificarDepartamento.style.display = "none";
        }

    }
}

function validarModDepartamento() {
    // Recuperar datos del formulario frmModificarComponente
    let idDepartamento = frmModificarDepartamento.txtModIdDepartamento.value.trim();
    let nombre = frmModificarDepartamento.txtModNombreDepartamento.value.trim();
    let localizacion = frmModificarDepartamento.txtModLocalizacion.value.trim();
    let manager = frmModificarDepartamento.txtModManager.value.trim();

    let valido = true;
    let errores = "";

    if (isNaN(idDepartamento)) {
        valido = false;
        errores += "El identificador de componente debe ser numérico";
    }


    if (nombre.length == 0 || localizacion.length == 0 || manager.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
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
            let tablaSalida = "<table class='table' id='listadoPorEmpleado'>";
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
    document.querySelector("#contenedorBusquedas").style.display = "block";
    let idDepartamento = parseInt(frmListadoEmpleadoDepartamento.lstDepartamento.value.trim());

    let respuesta = await oRrhh.listadoPorDepartamento(idDepartamento);

    let tabla = "<table class='table table-striped' id='listadoPorDepartamento'>";
    tabla += "<thead><tr><th>IDEMPLEADO</th><th>NOMBRE</th><th>APELLIDO</th><th>EMAIL</th><th>IDDEPARTAMENTO</th></tr></thead><tbody>";

    for (let employee of respuesta.datos) {
        tabla += "<tr><td>" + employee.employee_id + "</td>";
        tabla += "<td>" + employee.first_name + "</td>";
        tabla += "<td>" + employee.last_name + "</td>";
        tabla += "<td>" + employee.email + "</td>";
        tabla += "<td>" + employee.department_id + "</td>";
        
       
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#contenedorBusquedas").innerHTML = tabla;
    

    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorDepartamento").addEventListener("click", procesarBotonEditarEmpleado);
}

function procesarBotonEditarEmpleado(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de componentes
        frmModificarEmpleado.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del componente
        let employee = JSON.parse(boton.dataset.employee);

        frmModificarEmpleado.txtModIdEmpleado.value = employee.employee_id;
        frmModificarEmpleado.txtModNombre.value = employee.first_name;
        frmModificarEmpleado.txtModApellido.value = employee.last_name;
        frmModificarEmpleado.txtModEmail.value = employee.email;
        actualizarDesplegableDepartamento(employee.department_id);


    }
}

async function procesarModificarEmpleado(){
    let idEmpleado = frmModificarEmpleado.txtModIdEmpleado.value.trim();
    let nombre = frmModificarEmpleado.txtModNombre.value.trim();
    let apellido = frmModificarEmpleado.txtModApellido.value.trim();
    let email = frmModificarEmpleado.txtModEmail.value.trim();
    let idDepartamento = parseInt(frmModificarEmpleado.lstModIdDepartamento.value.trim());

    // Validar datos del formulario
    if (validarModEmpleado()) {
        let respuesta = await oRrhh.modificarEmpleado(new Empleado(idEmpleado, nombre, apellido, email, idDepartamento));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarEmpleado.reset();
            // Ocultar el formulario
            frmModificarEmpleado.style.display = "none";
        }

    }
}

function validarModEmpleado() {
    // Recuperar datos del formulario frmModificarComponente
    let idEmpleado = frmModificarEmpleado.txtModIdEmpleado.value.trim();
    let nombre = frmModificarEmpleado.txtModNombre.value.trim();
    let apellido = frmModificarEmpleado.txtModApellido.value.trim();
    let email = frmModificarEmpleado.txtModEmail.value.trim();
    let idDepartamento = parseInt(frmModificarEmpleado.lstModIdDepartamento.value.trim());

    let valido = true;
    let errores = "";

    if (isNaN(idEmpleado)) {
        valido = false;
        errores += "El identificador de componente debe ser numérico";
    }

    if (isNaN(idDepartamento)) {
        valido = false;
        errores += "El precio del componente debe ser numérico";
    }

    if (nombre.length == 0 || apellido.length == 0 || email.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

