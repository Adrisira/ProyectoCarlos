-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-11-2023 a las 17:43:21
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rrhh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departments`
--

CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `department_name` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `location` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `manager` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `location`, `manager`) VALUES
(1, 'Fruteria', 'Dos Hermanas', 'Mari Sol'),
(2, 'Recursos Humanos', 'Dos Hermanas', 'Loli'),
(3, 'Pescaderia', 'Dos Hermanas', 'Manolo'),
(4, 'Congelados', 'Dos Hermanas', 'Jose Luis'),
(5, 'Charcuteria', 'Dos Hermanas', 'Marilo'),
(6, 'IT', 'Dos Hermanas', 'Pepe'),
(7, 'Contabilidad', 'Dos Hermanas', 'Antonio'),
(8, 'Servicio al Cliente', 'Dos Hermanas', 'Antonio'),
(9, 'Logística y Cadena de Suministro', 'Dos Hermanas', 'Juani'),
(10, 'Administración y Operaciones', 'Dos Hermanas', 'Laura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `employee_id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `department_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `email`, `department_id`) VALUES
(1, 'Adrian', 'Siguenza', 'adrian@gmail.com', 1),
(2, 'Juani', 'Troya', 'juani@gmail.com', 3),
(3, 'Juan Antonio', 'Morales', 'juan@gmail.com', 4),
(4, 'Maria', 'Jimenez', 'maria@gmail.com', 3),
(5, 'Puala', 'Castillo', 'paula@gmail.com', 2),
(6, 'Julian', 'Gonzalez', 'julian@gmail.coom', 5),
(7, 'Anotnio', 'Blandon', 'antonio@gmail.com', 7),
(8, 'Pepe', 'Siguenza', 'pepe@gmail.com', 6),
(9, 'Pepa', 'Calvillo', 'pepe@gmail.com', 8),
(10, 'Laura', 'Martinez', 'laura@gmail.com', 9),
(11, 'Gabriela ', 'Pérez', 'gabriela@gmail.com', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `fk_employees` (`department_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `fk_employees` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
