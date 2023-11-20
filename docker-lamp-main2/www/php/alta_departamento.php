<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre = $_POST['departament_name'];
$localizacion = $_POST['location'];

$sql = "INSERT INTO departaments VALUES (null,'$nombre','$localizacion', null);";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el tipo de componente", $conexion);
}
?>