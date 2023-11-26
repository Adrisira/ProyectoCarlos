<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$iddepartamento = $_POST['iddepartamento'];

// SQL
$sql = "SELECT * FROM departments 
WHERE department_id = $iddepartamento;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el componente", $conexion);
}