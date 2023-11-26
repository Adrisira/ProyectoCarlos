<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$empleado = json_decode($_POST['empleado']);

$sql = "UPDATE employees
SET first_name = '" . $empleado->nombre . "', 
last_name = '" .  $empleado->apellido . "', 
email = '" .  $empleado->email . "', 
department_id = $empleado->departamento
WHERE employee_id = $empleado->id ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el empelado", $conexion);
}
?>