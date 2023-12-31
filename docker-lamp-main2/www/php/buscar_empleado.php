<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idempleado = $_POST['empleado'];

// SQL
$sql = "SELECT e.*, d.department_id FROM employees e, departments d
WHERE e.department_id = d.department_id
AND employee_id = $idempleado;";

//$sql = "SELECT c.*, p.descripcion AS tipodesc FROM componente c, tipo p 
//WHERE c.idtipo = p.idtipo 
//AND idcomponente = $idcomponente;";
$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el componente", $conexion);
}