<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$iddepartamento = $_POST['iddepartamento'];

// SQL
$sql = "DELETE FROM departments WHERE department_id = $iddepartamento;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);