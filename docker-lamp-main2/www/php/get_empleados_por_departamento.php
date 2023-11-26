<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$iddepartamento = $_GET['iddepartamento'];

// SQL
$sql = "SELECT e.* FROM employees as e, departments as d 
WHERE e.department_id = d.department_id 
AND e.department_id = $iddepartamento;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);