class Departamento{
    constructor(id, nombre, localizacion, manager){
        this.id = id;
        this.nombre = nombre;
        this.localizacion = localizacion;
        this.manager = manager;
    }
}

class Rrhh {
    async altaDepartamento(evento){
        let datos = new FormData();
        datos.append("departament_name", evento.nombre);
        datos.append("location", evento.localizacion);

        let respuesta = await fetch("../php/alta_departamento.php", datos);

        return respuesta;

    }
}

