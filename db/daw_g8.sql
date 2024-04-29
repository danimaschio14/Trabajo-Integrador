-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2024 a las 04:35:23
-- Versión del servidor: 8.0.18
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `daw_g8`
--
CREATE DATABASE IF NOT EXISTS `daw_g8` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `daw_g8`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `type` enum('MANAGMENT','LOGISTIC','CUSTOMER SERVICE') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity-record`
--

DROP TABLE IF EXISTS `activity-record`;
CREATE TABLE `activity-record` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('CREATED','PENDING','IN PROGRESS','FINISHED','CANCELED','UPDATED ACTIVITY') COLLATE utf8mb4_general_ci NOT NULL,
  `priority` enum('HIGH','MEDIUM','LOW','NOT ASIGNED') COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `activityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('ADMIN','EMPLOYEE') COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `user`
--

TRUNCATE TABLE `user`;
--
-- Volcado de datos para la tabla `user`
--

-- Las contraseñas de todos los usuarios tienen el mismo value: 'password'
INSERT INTO `user` (`id`, `name`, `lastName`, `email`, `password`, `role`, `status`) VALUES
(1, 'Daniela', 'Maschio', 'danielamaschio6@gmail.com', '$2b$10$JMABtRdwGaVdYsKwHrHn6.rvM.1HH5LIYzt5aOUQGJEBZ5oPUngi.', 'ADMIN', 'ACTIVE'),
(2, 'Maria Emilia', 'Walter', 'eemi.walter@gmail.com', '$2b$10$JMABtRdwGaVdYsKwHrHn6.rvM.1HH5LIYzt5aOUQGJEBZ5oPUngi.', 'ADMIN', 'ACTIVE'),
(3, 'Mauricio', 'Sanchez', 'mauro98sanchez@gmail.com', '$2b$10$JMABtRdwGaVdYsKwHrHn6.rvM.1HH5LIYzt5aOUQGJEBZ5oPUngi.', 'ADMIN', 'ACTIVE'),
(4, 'Sebastian Ignacio', 'Centurion', 'sebastian.ignacio.centurion@gmail.com', '$2b$10$JMABtRdwGaVdYsKwHrHn6.rvM.1HH5LIYzt5aOUQGJEBZ5oPUngi.', 'ADMIN', 'ACTIVE'),
(5, 'Vito', 'Don', 'vito.don@gmail.com', '$2b$10$JMABtRdwGaVdYsKwHrHn6.rvM.1HH5LIYzt5aOUQGJEBZ5oPUngi.', 'EMPLOYEE', 'ACTIVE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `activity-record`
--
ALTER TABLE `activity-record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3199f2a5a7852e6cd7178d9880a` (`userId`),
  ADD KEY `FK_6d11232f4f8e739a5ecf0b52cb1` (`activityId`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `activity-record`
--
ALTER TABLE `activity-record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activity-record`
--
ALTER TABLE `activity-record`
  ADD CONSTRAINT `FK_3199f2a5a7852e6cd7178d9880a` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_6d11232f4f8e739a5ecf0b52cb1` FOREIGN KEY (`activityId`) REFERENCES `activity` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
