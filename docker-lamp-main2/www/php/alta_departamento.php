<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre = $_POST['nombre'];
$localizacion = $_POST['localizacion'];
$manager = $_POST['manager'];

$sql = "INSERT INTO departments VALUES (null,'$nombre','$localizacion', '$manager');";

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