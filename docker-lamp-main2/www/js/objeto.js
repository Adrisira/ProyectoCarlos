class Departamento{
    constructor(id, nombre, localizacion, manager){
        this.id = id;
        this.nombre = nombre;
        this.localizacion = localizacion;
        this.manager = manager;
    }
}

class Empleado {
    constructor(id, nombre, apellido, email, departamento ){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.departamento = departamento;
    }
}

class Rrhh {
    async altaDepartamento(oDepartamento) {
        let datos = new FormData();
        datos.append("nombre", oDepartamento.nombre);
        datos.append("localizacion", oDepartamento.localizacion);
        datos.append("manager", oDepartamento.manager);

        let respuesta = await peticionPOST("alta_departamento.php", datos);

        return respuesta;

    }

    async altaEmpleado(oEmpleado) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("empleado",JSON.stringify(oEmpleado));
       
        let respuesta = await peticionPOST("alta_empleado.php", datos);

        return respuesta;
    }

    async get_departamentos() {
        let datos = new FormData();
        let respuesta = await peticionPOST("get_departamentos.php", datos);
        return respuesta;
    }

    async listadoDepartamentos() {
        let listado = "";

        let respuesta = await peticionGET("get_departamentos.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID</th><th>Nombre departamento</th><th>Localizacion</th><th>Manager</th></tr></thead>";
            listado += "<tbody>";

            for (let departments of respuesta.datos) {
                listado += "<tr><td>" + departments.department_id + "</td>";
                listado += "<td>" + departments.department_name + "</td>";
                listado += "<td>" + departments.location + "</td>";
                listado += "<td>" + departments.manager + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async listadoEmpleados() {
        let listado = "";

        let respuesta = await peticionGET("get_empleados.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>ID Departamento</th></tr></thead>";
            listado += "<tbody>";

            for (let employees of respuesta.datos) {
                listado += "<tr><td>" + employees.employee_id + "</td>";
                listado += "<td>" + employees.first_name + "</td>";
                listado += "<td>" + employees.last_name + "</td>";
                listado += "<td>" + employees.email + "</td>";
                listado += "<td>" + employees.department_id + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async buscarDepartamento(idDepartamento) {
        let datos = new FormData();

        datos.append("iddepartamento", idDepartamento);

        let respuesta = await peticionPOST("buscar_departamento.php", datos);

        return respuesta;
    }

    async buscarEmpleado(idEmpleado) {
        let datos = new FormData();

        datos.append("empleado", idEmpleado);

        let respuesta = await peticionPOST("buscar_empleado.php", datos);

        return respuesta;
    }

    async borrarDepartamento(idDepartamento) {
        let datos = new FormData();

        datos.append("iddepartamento", idDepartamento);

        let respuesta = await peticionPOST("borrar_departamento.php", datos);

        return respuesta;
    }

    async borrarDepartamento(idEmpleado) {
        let datos = new FormData();

        datos.append("idempleado", idEmpleado);

        let respuesta = await peticionPOST("borrar_empleado.php", datos);

        return respuesta;
    }

    async listadoPorDepartamento(idDepartamento){
        let datos = new FormData();

        datos.append("iddepartamento", idDepartamento);

        let respuesta = await peticionGET("get_empleados_por_departamento.php", datos);

        return respuesta;
    }
    async modificarDepartamento(oDepartamento) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("departamento",JSON.stringify(oDepartamento));
       
        let respuesta = await peticionPOST("modificar_departamento.php", datos);

        return respuesta;
    }
    async modificarEmpleado(oEmpleado) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("empleado",JSON.stringify(oEmpleado));
       
        let respuesta = await peticionPOST("modificar_empleado.php", datos);

        return respuesta;
    }
}

