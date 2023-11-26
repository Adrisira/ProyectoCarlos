<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$departamento = json_decode($_POST['departamento']);

$sql = "UPDATE departments
SET department_name = '" . $departamento->nombre . "', 
location = '" .  $departamento->localizacion . "', 
manager = '" .  $departamento->manager . "'
WHERE department_id = $departamento->id ";

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