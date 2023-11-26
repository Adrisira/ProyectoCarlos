<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idempleado = $_POST['idempleado'];

// SQL
$sql = "DELETE FROM employees WHERE  employee_id = $idempleado;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);