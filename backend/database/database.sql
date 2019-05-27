-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2019 a las 14:45:40
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP USER IF EXISTS 'ocms_admin'@'localhost';
DROP DATABASE IF EXISTS ocms;

--
-- Base de datos: `ocms`
--

CREATE DATABASE ocms;

USE ocms;

CREATE USER 'ocms_admin'@'localhost' IDENTIFIED BY 'ocms_admin';

GRANT ALL PRIVILEGES ON ocms.* TO 'ocms_admin'@'localhost';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE IF NOT EXISTS `actividades` (
  `programacion` int(30) NOT NULL,
  `observador` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `docente` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `semestre` int(6) DEFAULT NULL,
  `grupo` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `codigo` int(30) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `lugar` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `aforo` int(6) DEFAULT NULL,
  `asistentes` int(6) DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Actividad_Programacion` (`programacion`),
  KEY `fk_Actividad_Observador` (`observador`),
  KEY `fk_Actividad_Docente` (`docente`),
  KEY `fk_Actividad_Grupo` (`semestre`,`grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agendagrupos`
--

CREATE TABLE IF NOT EXISTS `agendagrupos` (
  `actividad` int(30) NOT NULL,
  `fecha` date NOT NULL,
  KEY `fk_AgendaGrupo_Actividad` (`actividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE IF NOT EXISTS `asignaciones` (
  `rol` int(6) NOT NULL,
  `usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `unidad` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `semestreInicio` int(6) NOT NULL,
  `semestreFin` int(6) DEFAULT NULL,
  PRIMARY KEY (`usuario`,`semestreInicio`,`rol`,`unidad`),
  KEY `fk_Asignacion_Rol` (`rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `asignaciones`
--

INSERT INTO `asignaciones` (`rol`, `usuario`, `unidad`, `semestreInicio`, `semestreFin`) VALUES
(0, 'AD1234', '1', 20181, NULL),
(7, 'AL1234', '1', 20181, NULL),
(4, 'CP1234', '1', 20181, NULL),
(6, 'DO1234', '1', 20181, 0),
(3, 'JE1234', '1', 20181, NULL),
(1, 'PA1234', '1', 20181, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE IF NOT EXISTS `planes` (
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `programa` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `numeroAcuerdo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `semestreInicio` int(6) NOT NULL,
  `semestreVigencia` int(6) NOT NULL,
  `rutaActa` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `rutaImagen` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Planes_Programa` (`programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE IF NOT EXISTS `asignaturas` (
  `programa` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `uoc` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `plan` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `creditos` int(6) NOT NULL,
  `nivel` int(6) NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `horasDirectas` int(6) DEFAULT NULL,
  `horasIndependientes` int(6) DEFAULT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Asignaturas_UOC` (`uoc`),
  KEY `fk_Asignaturas_Plan` (`plan`),
  KEY `fk_Asignaturas_Programa` (`programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE IF NOT EXISTS `docentes` (
  `uoc` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  FOREIGN KEY (`uoc`) REFERENCES `uocs` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`uoc`, `codigo`, `nombre`, `correo`, `telefono`) VALUES
('AP', '1121314', 'DOCENTE23', 'docente23@gmail.com', '3131313'),
('AC', '1125319', 'DOCENTE_AC', 'docenteac@gmail.com', '32134213'),
('IS', '1134523', 'BELL MANRIQUE', 'bmanrique@udem.edu.co', '34432412');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `microcurriculo`
--

CREATE TABLE IF NOT EXISTS `microcurriculos` (
  `asignatura` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` int COLLATE utf8_spanish_ci NOT NULL AUTO_INCREMENT,
  `version` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  FOREIGN KEY (`asignatura`) REFERENCES `asignaturas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participaciones`
--

CREATE TABLE IF NOT EXISTS `participaciones` (
  `participante` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` int COLLATE utf8_spanish_ci NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `observaciones` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  FOREIGN KEY (`participante`) REFERENCES `docentes` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturasPrerrequisitos`
--

CREATE TABLE IF NOT EXISTS `asignaturasPrerrequisitos` (
  `id` int COLLATE utf8_spanish_ci NOT NULL AUTO_INCREMENT,
  `asignatura` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `prerrequisito` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`asignatura`) REFERENCES `asignaturas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`prerrequisito`) REFERENCES `asignaturas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas`
--

CREATE TABLE IF NOT EXISTS `caracteristicas`(
  `codigo` int COLLATE utf8_spanish_ci NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `sesionesDirectas` int(6) NOT NULL,
  `sesionesIndirectas` int(6) NOT NULL,
  `espacio` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `grupo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `medios` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `producto` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `evaluacion` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE IF NOT EXISTS `asistencias` (
  `actividad` int(30) NOT NULL,
  `asistente` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `observaciones` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`actividad`,`asistente`),
  KEY `fk_Asistencia_Usuario` (`asistente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendarios`
--

CREATE TABLE IF NOT EXISTS `calendarios` (
  `semestre` int(30) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `acuerdo` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`semestre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuraciones`
--

CREATE TABLE IF NOT EXISTS `configuraciones` (
  `usuario` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` int(6) NOT NULL AUTO_INCREMENT,
  `tiempo` int(6) DEFAULT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Configuracion_Usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependencias`
--

CREATE TABLE IF NOT EXISTS `dependencias` (
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facultades`
--

CREATE TABLE IF NOT EXISTS `facultades` (
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ubicacion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `facultades`
--

INSERT INTO `facultades` (`codigo`, `nombre`, `descripcion`, `ubicacion`) VALUES
('401', 'Facultad de Derecho', '', NULL),
('402', 'Facultad de Ciencias Sociales y Humanas', '', NULL),
('409', 'Facultad de Comunicación', '', NULL),
('415', 'Facultad de Ciencias Económicas y Administrativas', '', NULL),
('420', 'Facultad de Ingenierías', '', 'Bloque 4'),
('423', 'Facultad de Ciencias Básicas', '', 'Bloque 1'),
('500', 'Facultad de Diseño', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE IF NOT EXISTS `grupos` (
  `asignatura` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `semestre` int(6) NOT NULL,
  `aula` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `horario` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`semestre`,`codigo`),
  KEY `fk_Grupo_Asignatura` (`asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itemslista`
--

CREATE TABLE IF NOT EXISTS `itemslista` (
  `lista` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `valor` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(6) NOT NULL,
  PRIMARY KEY (`lista`,`valor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE IF NOT EXISTS `listas` (
  `modulo` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Lista_Modulo` (`modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

CREATE TABLE IF NOT EXISTS `modulos` (
  `codigo` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `icono` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `referencia` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `contenido` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `orden` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`codigo`, `nombre`, `icono`, `referencia`, `contenido`, `orden`) VALUES
('AD', 'Administración', 'iLocked.png', 'null', '<h1>Administraci&oacute;n</h1>\n<center>\nMódulo para las opciones de Configuración y Seguridad\n</center>', '6'),
('BP', 'Banco de Proyectos', 'iBank.png', 'BP.Index', '<h1>Banco de Proyectos</h1>\n<center>Contenido de la p&aacute;gina principal del módulo Banco de Proyectos... </center>', '3'),
('CA', 'Calendario Académico', 'iCalendar.png', 'CA.Index', '<h1>Calendario Acad&eacute;mico</h1>\n<center>\nContenido de la p&aacute;gina principal del módulo Calendario Académico...\n</center>', '2'),
('GC', 'Gestión Curricular', 'iBook.png', 'GC.Index', '<h1>Gesti&oacute;n Curricular</h1>\n<center>Contenido principal del módulo Gestión Curricular... </center>', '1'),
('OA', 'Orientación Académica', 'iDashboard.png', 'OA.Index', '<h1>Orientaci&oacute;n Acad&eacute;mica</h1>\n<center>\n<div id="header-slider">\n<div id="slider-container">\n<div id="slider2"><img src="webroot/images/content/aa02.jpg" border="0" alt="" /></div>\n<!-- end #slider2 --></div>\n<!-- end #slider-container --></div>\n<!-- end header-slider --></center>\n<div', '4'),
('RS', 'Redes<br>Sociales', 'iMessage.png', 'RS.Index', '<h1>Banco de Proyectos</h1>\n<center>Contenido de la p&aacute;gina principal del módulo Redes Sociales... </center>', '5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE IF NOT EXISTS `notificaciones` (
  `usuario` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `evento` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` int(30) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `titulo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `cuerpo` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Notificacion_Usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE IF NOT EXISTS `opciones` (
  `modulo` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `titulo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `referencia` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `urlAmigable` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `contenido` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Opcion_Modulo` (`modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`modulo`, `codigo`, `titulo`, `referencia`, `urlAmigable`, `contenido`, `tipo`, `estado`) VALUES
('AD', 'AD', 'Administración', '', '', '', 'Lateral-Titulo', 'gray'),
('AD', 'AD-100', 'Gestionar Usuarios', 'AD.GestionarUsuarios.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-150', 'Definir Módulos', 'AD.DefinirModulos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-200', 'Definir Opciones', 'AD.DefinirModulos.Listar', '', '', 'Por-Vinculo', 'gray'),
('AD', 'AD-250', 'Definir Listas', 'AD.DefinirListas.Listar', '', '', 'Por-Vinculo', 'gray'),
('AD', 'AD-300', 'Gestionar Roles', 'AD.GestionarRoles.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-350', 'Otorgar Privilegios', 'AD.OtorgarPrivilegios.Listar', '', '', 'Por-Vinculo', 'gray'),
('AD', 'AD-400', 'Recuperar Clave', 'Publico.RecuperarClave', '', '', 'No-Menu', 'green'),
('AD', 'AD-450', 'Iniciar Sesión', 'Publico.IniciarSesion', '', '', 'No-Menu', 'green'),
('AD', 'AD-500', 'Cerrar Sesión', 'home', '', '', 'No-Menu', 'green'),
('AD', 'AD-550', 'Actualizar Perfil', 'AD.ActualizarPerfil.Editar', '', '', 'Lateral-Opcion', 'green'),
('AD', 'AD-600', 'Configurar Notificaciones', 'AD.ConfigurarNotificaciones.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-650', 'Gestionar Dependencias', 'AD.GestionarDependencias.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-700', 'Gestionar Facultades', 'AD.GestionarFacultades.Listar', '', '', 'Lateral-Opcion', 'green'),
('AD', 'AD-750', 'Gestionar Programas', 'AD.GestionarProgramas.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-800', 'Definir UOCs', 'AD.DefinirUocs.Listar', '', '', 'Por-Vinculo', 'gray'),
('AD', 'AD-850', 'Asignar Responsabilidades', 'AD.AsignarResponsabilidades.Listar', '', '', 'Lateral-Opcion', 'gray'),
('AD', 'AD-900', 'Cargar Matrícula', 'AD.CargarMatricula.Listar', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP', 'Banco de Proyectos', '', '', '', 'Lateral-Titulo', 'gray'),
('BP', 'BP-100', 'Gestionar Artefactos', 'BP.GestionarArtefactos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP-150', 'Definir Criterios', 'BP.DefinirCriterios.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-200', 'Gestionar Grupos', 'BP.GestionarGrupos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP-250', 'Programar Agenda de Entregas', 'BP.ProgramarAgenda.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-300', 'Gestionar Equipos', 'BP.GestionarEquipos.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-350', 'Revisar Entregas', 'BP.RevisarEntregas.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-400', 'Calificar Entrega', 'BP.CalificarEntrega.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-450', 'Gestionar Proyectos', 'BP.GestionarProyectos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP-500', 'Proponer Proyecto', 'BP.ProponerProyecto.Crear', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-550', 'Detallar Proyecto', 'BP.DetallarProyecto.Listar', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-600', 'Revisar Proyecto', 'BP.RevisarProyecto', '', '', 'Por-Vinculo', 'gray'),
('BP', 'BP-650', 'Revisar Agenda', 'BP.RevisarAgenda', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP-700', 'Programar Notificación de Entregas', 'BP.ProgramarNotificacion.Listar', '', '', 'No-Menu', 'gray'),
('BP', 'BP-750', 'Revisar Asignaturas', 'BP.RevisarAsignaturas.Listar', '', '', 'Lateral-Opcion', 'gray'),
('BP', 'BP-800', 'Realizar Entrega', 'BP.RealizarEntrega', '', '', 'Por-Vinculo', 'gray'),
('CA', 'CA', 'Calendario Académico', '', '', '', 'Lateral-Titulo', 'gray'),
('CA', 'CA-100', 'Gestionar Calendarios', 'CA.GestionarCalendarios.Listar', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-150', 'Especificar Programaciones', 'CA.EspecificarProgramaciones.Listar', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-200', 'Programar Actividades', 'CA.ProgramarActividades.Listar', '', '', 'Por-Vinculo', 'gray'),
('CA', 'CA-250', 'Programar Discriminando por Nivel', 'CA.ProgramarPorNivel.Listar', '', '', 'Por-Vinculo', 'gray'),
('CA', 'CA-300', 'Revisar Agenda', 'CA.RevisarAgenda.Listar', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-350', 'Programar Notificación de Actividad', 'CA.ProgramarNotificaciones', '', '', 'No-Menu', 'gray'),
('CA', 'CA-400', 'Programar Cursos', 'CA.ProgramarCursos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-450', 'Validar Disponibilidad del Observador', 'CA.ValidarDisponibilidad', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-500', 'Sugerir Programación', 'CA.SugerirProgramacion', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-550', 'Validar Incompatibilidades de Evaluaciones', 'CA.ValidarIncompatibilidadesEvaluaciones', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-600', 'Programar Eventos', 'CA.ProgramarEventos', '', '', 'Lateral-Opcion', 'gray'),
('CA', 'CA-650', 'Verificar Asistencia a Evento', 'CA.VerificarAsistenciaEvento', '', '', 'Lateral-Opcion', 'gray'),
('GC', 'GC', 'Gestión Curricular', '', '', '', 'Lateral-Titulo', 'gray'),
('GC', 'GC-100', 'Gestionar Planes', 'GC.GestionarPlanes.Listar', '', '', 'Lateral-Opcion', 'gray'),
('GC', 'GC-150', 'Gestionar Asignaturas', 'GC.GestionarAsignaturas.Listar', '', '', 'Por-Vinculo', 'gray'),
('GC', 'GC-200', 'Estructurar Microcurrículo', 'GC.EstructurarMicrocurriculo.Listar', '', '', 'Lateral-Opcion', 'gray'),
('GC', 'GC-250', 'Solicitar Microcurrículo', 'GC.SolicitarMicrocurriculo.Listar', '', '', 'Por-Vinculo', 'gray'),
('GC', 'GC-300', 'Revisar Microcurrículo', 'GC.RevisarMicrocurriculo.Listar', '', '', 'Por-Vinculo', 'gray'),
('GC', 'GC-350', 'Activar Microcurrículo', 'GC.ActivarMicrocurriculo', '', '', 'Por-Vinculo', 'gray'),
('GC', 'GC-400', 'Proponer Microcurrículo', 'GC.ProponerMicrocurriculo.Editar', '', '', 'Lateral-Opcion', 'gray'),
('GC', 'GC-450', 'Vincular Bibliografía', 'GC.VincularBibliografia.Listar', '', '', 'Por-Vinculo', 'gray'),
('OA', 'OA', 'Orientación Académica', '', '', '', 'Lateral-Titulo', 'gray'),
('OA', 'OA-100', 'Programar Asesoría', 'OA.ProgramarAsesoria.Listar', '', '', 'Por-Vinculo', 'gray'),
('OA', 'OA-150', 'Programar Agenda de Asesorías', 'OA.ProgramarAgenda.Listar', '', '', 'Lateral-Opcion', 'gray'),
('OA', 'OA-200', 'Solicitar Asesoría', 'OA.SolicitarAsesoria.Crear', '', '', 'No-Menu', 'gray'),
('OA', 'OA-250', 'Responder Solicitud de  Asesoría', 'OA.ResponderSolicitud.Crear', '', '', 'No-Menu', 'gray'),
('OA', 'OA-300', 'Confirmar Asesoría', 'OA.ConfirmarAsesoria.Editar', '', '', 'No-Menu', 'gray'),
('OA', 'OA-350', 'Cancelar Asesoría', 'OA.CancelarAsesoria.Editar', '', '', 'Por-Vinculo', 'gray'),
('OA', 'OA-400', 'Verificar Asistencia', 'OA.VerificarAsistencia.Listar', '', '', 'Lateral-Opcion', 'gray'),
('OA', 'OA-450', 'Tomar Asistencia', 'OA.TomarAsistencia.Listar', '', '', 'Lateral-Opcion', 'gray'),
('OA', 'OA-500', 'Detallar Asesoría', 'OA.DetallarAsesoria.Listar', '', '', 'Lateral-Opcion', 'gray'),
('OA', 'OA-550', 'Revisar Agenda', 'OA.RevisarAgenda.Listar', '', '', 'Lateral-Opcion', 'gray'),
('OA', 'OA-600', 'Programar Notificación de Asesoría', 'OA.ProgramarNotificacion.Listar', '', '', 'No-Menu', 'gray'),
('OA', 'OA-650', 'Evaluar Asesoría', 'OA.EvaluarAsesoria.Listar', '', '', 'Por-Vinculo', 'gray'),
('OA', 'OA-700', 'Revisar Analítica de Asesorías', 'OA.RevisarAnalitica', '', '', 'Lateral-Opcion', 'gray'),
('RS', 'RS', 'Redes Sociales', '', '', '', 'Lateral-Titulo', 'gray'),
('RS', 'RS-100', 'Gestionar Perfiles', 'OA.GestionarPerfiles.Listar', '', '', 'Lateral-Opcion', 'gray'),
('RS', 'RS-150', 'Enlazar Perfil', 'RS.EnlazarPerfil.Crear', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-200', 'Vincular Perfil', 'RS.VincularPerfil.Listar', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-250', 'Desvincular Perfil', 'RS.DesvincularPerfil', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-300', 'Gestionar Eventos', 'RS.GestionarEventos.Listar', '', '', 'Lateral-Opcion', 'gray'),
('RS', 'RS-350', 'Hacer Publicación', 'RS.HacerPublicacion', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-400', 'Visualizar Publicación', 'RS.VisualizarPublicacion', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-450', 'Programar Publicación', 'RS.ProgramarPublicacion', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-500', 'Validar Publicación', 'RS.ValidarPublicacion', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-550', 'Visualizar Vista Previa', 'RS.VisualizarVistaPrevia', '', '', 'Por-Vinculo', 'gray'),
('RS', 'RS-600', 'Revisar Analítica Social', 'RS.RevisarAnaliticaSocial', '', '', 'Por-Vinculo', 'gray');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegios`
--

CREATE TABLE IF NOT EXISTS `privilegios` (
  `rol` int(30) NOT NULL,
  `opcion` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`rol`,`opcion`),
  KEY `fk_Privilegio_Opcion` (`opcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `privilegios`
--

INSERT INTO `privilegios` (`rol`, `opcion`) VALUES
(0, 'AD'),
(1, 'AD'),
(2, 'AD'),
(3, 'AD'),
(4, 'AD'),
(5, 'AD'),
(6, 'AD'),
(7, 'AD'),
(8, 'AD'),
(0, 'AD-100'),
(0, 'AD-150'),
(0, 'AD-200'),
(0, 'AD-250'),
(0, 'AD-300'),
(0, 'AD-350'),
(0, 'AD-550'),
(1, 'AD-550'),
(2, 'AD-550'),
(3, 'AD-550'),
(4, 'AD-550'),
(5, 'AD-550'),
(6, 'AD-550'),
(7, 'AD-550'),
(8, 'AD-550'),
(0, 'AD-600'),
(1, 'AD-600'),
(2, 'AD-600'),
(3, 'AD-600'),
(4, 'AD-600'),
(5, 'AD-600'),
(6, 'AD-600'),
(7, 'AD-600'),
(8, 'AD-600'),
(0, 'AD-650'),
(0, 'AD-700'),
(2, 'AD-700'),
(0, 'AD-750'),
(2, 'AD-750'),
(3, 'AD-750'),
(0, 'AD-800'),
(3, 'AD-800'),
(0, 'AD-850'),
(2, 'AD-850'),
(3, 'AD-850'),
(5, 'AD-850'),
(0, 'AD-900'),
(3, 'AD-900'),
(5, 'AD-900'),
(6, 'AD-900'),
(6, 'BP'),
(7, 'BP'),
(6, 'BP-100'),
(6, 'BP-150'),
(6, 'BP-200'),
(6, 'BP-250'),
(6, 'BP-300'),
(6, 'BP-350'),
(6, 'BP-400'),
(6, 'BP-450'),
(7, 'BP-450'),
(7, 'BP-500'),
(6, 'BP-550'),
(7, 'BP-550'),
(6, 'BP-600'),
(6, 'BP-650'),
(7, 'BP-650'),
(7, 'BP-750'),
(7, 'BP-800'),
(1, 'CA'),
(2, 'CA'),
(3, 'CA'),
(4, 'CA'),
(6, 'CA'),
(7, 'CA'),
(1, 'CA-100'),
(1, 'CA-150'),
(2, 'CA-150'),
(3, 'CA-150'),
(6, 'CA-150'),
(1, 'CA-200'),
(2, 'CA-200'),
(3, 'CA-200'),
(6, 'CA-200'),
(3, 'CA-250'),
(1, 'CA-300'),
(2, 'CA-300'),
(3, 'CA-300'),
(6, 'CA-300'),
(7, 'CA-300'),
(4, 'CA-400'),
(3, 'CA-450'),
(3, 'CA-500'),
(3, 'CA-550'),
(2, 'CA-600'),
(3, 'CA-600'),
(6, 'CA-600'),
(7, 'CA-600'),
(2, 'CA-650'),
(3, 'CA-650'),
(6, 'CA-650'),
(7, 'CA-650'),
(3, 'GC'),
(5, 'GC'),
(6, 'GC'),
(3, 'GC-100'),
(5, 'GC-100'),
(3, 'GC-150'),
(5, 'GC-150'),
(3, 'GC-200'),
(5, 'GC-200'),
(3, 'GC-250'),
(5, 'GC-250'),
(5, 'GC-300'),
(5, 'GC-350'),
(5, 'GC-400'),
(6, 'GC-400'),
(5, 'GC-450'),
(6, 'GC-450'),
(2, 'OA'),
(3, 'OA'),
(5, 'OA'),
(6, 'OA'),
(7, 'OA'),
(8, 'OA'),
(2, 'OA-100'),
(3, 'OA-100'),
(5, 'OA-100'),
(6, 'OA-100'),
(8, 'OA-100'),
(2, 'OA-150'),
(3, 'OA-150'),
(5, 'OA-150'),
(6, 'OA-150'),
(8, 'OA-150'),
(2, 'OA-250'),
(3, 'OA-250'),
(2, 'OA-350'),
(3, 'OA-350'),
(5, 'OA-350'),
(6, 'OA-350'),
(8, 'OA-350'),
(2, 'OA-400'),
(3, 'OA-400'),
(6, 'OA-400'),
(2, 'OA-450'),
(3, 'OA-450'),
(5, 'OA-450'),
(6, 'OA-450'),
(8, 'OA-450'),
(2, 'OA-500'),
(3, 'OA-500'),
(5, 'OA-500'),
(6, 'OA-500'),
(8, 'OA-500'),
(2, 'OA-550'),
(3, 'OA-550'),
(5, 'OA-550'),
(6, 'OA-550'),
(7, 'OA-550'),
(8, 'OA-550'),
(7, 'OA-650'),
(1, 'RS'),
(2, 'RS'),
(3, 'RS'),
(8, 'RS'),
(1, 'RS-100'),
(2, 'RS-100'),
(3, 'RS-100'),
(1, 'RS-150'),
(2, 'RS-150'),
(3, 'RS-150'),
(1, 'RS-200'),
(2, 'RS-200'),
(3, 'RS-200'),
(1, 'RS-250'),
(2, 'RS-250'),
(3, 'RS-250'),
(1, 'RS-300'),
(2, 'RS-300'),
(3, 'RS-300'),
(8, 'RS-300'),
(1, 'RS-350'),
(2, 'RS-350'),
(3, 'RS-350'),
(8, 'RS-350'),
(1, 'RS-450'),
(2, 'RS-450'),
(3, 'RS-450'),
(8, 'RS-450'),
(1, 'RS-500'),
(2, 'RS-500'),
(3, 'RS-500'),
(8, 'RS-500'),
(1, 'RS-550'),
(2, 'RS-550'),
(3, 'RS-550'),
(8, 'RS-550'),
(1, 'RS-600'),
(2, 'RS-600'),
(3, 'RS-600'),
(8, 'RS-600');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programaciones`
--

CREATE TABLE IF NOT EXISTS `programaciones` (
  `semestre` int(6) NOT NULL,
  `programa` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `grupo` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `creador` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `facultad` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `codigo` int(30) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nivelPosgrado` int(6) DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Programacion_Programa` (`programa`),
  KEY `fk_Programacion_Grupo` (`semestre`,`grupo`),
  KEY `fk_Programacion_Usuario` (`creador`),
  KEY `fk_Programacion_Facultad` (`facultad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programas`
--

CREATE TABLE IF NOT EXISTS `programas` (
  `facultad` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `semestres` int(6) NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `modalidad` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `codigoSnies` varchar(6) COLLATE utf8_spanish_ci DEFAULT NULL,
  `registroIcfes` varchar(6) COLLATE utf8_spanish_ci DEFAULT NULL,
  `resolucion` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `actualizacion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `presentacion` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_Programa_Facultad` (`facultad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `programas`
--

INSERT INTO `programas` (`facultad`, `codigo`, `nombre`, `semestres`, `tipo`, `modalidad`, `codigoSnies`, `registroIcfes`, `resolucion`, `actualizacion`, `presentacion`) VALUES
('401', '401-0020-05', 'Derecho', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('401', '401-2180-01', 'Investigación Criminal', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('402', '401-2940-01', 'Psicología', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('409', '409-0010-01', 'Comunicación y Relaciones Corporativas', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('409', '409-0286-01', 'Comunicación Gráfica Publicitaria', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('409', '409-0378-01', 'Comunicación y Lenguajes Audiovisuales', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('409', '409-1143-01', 'Tecnología en Edición para Televisión', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('409', '409-3018-01', 'Comunicación y Entretenimiento Digital', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0011-01', 'Administración de Empresas', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0012-01', 'Contaduría Pública', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0013-01', 'Economía', 0, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0231-01', 'Administración de Empresas Turísticas', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0385-01', 'Negocios Internacionales', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-0780-01', 'Mercadeo', 0, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('415', '415-2970-01', 'Administración de Agronegocios', 10, 'Pregrado', 'Diurno', '0', '000000', '', '', ''),
('420', '420-0015-01', 'Ingeniería Civil', 10, 'Pregrado', 'Diurno', '1516', '181262', '', '', ''),
('420', '420-0016-01', 'Ingeniería Ambiental', 10, 'Pregrado', 'Diurno', '3193', '000000', '', '', ''),
('420', '420-0017-01', 'Ingeniería de Sistemas', 10, 'Pregrado', 'Diurno', '3134', '181240', '', '', ''),
('420', '420-0019-01', 'Ingeniería Financiera', 10, 'Pregrado', 'Diurno', '7255', '181243', '', '', ''),
('420', '420-0507-01', 'Ingeniería de Telecomunicaciones', 10, 'Pregrado', 'Diurno', '17490', '181243', '', '', ''),
('420', '420-0623-01', 'Ingeniería Electrónica', 10, 'Pregrado', 'Diurno', '106217', '000000', '', '', ''),
('420', '420-2455-01', 'Ingeniería en Energía', 10, 'Pregrado', 'Diurno', '101595', '000000', '', '', ''),
('420', '420-2968-01', 'Ingeniería de Materiales', 10, 'Pregrado', 'Diurno', '103150', '000000', '', '', ''),
('420', '420-2969-01', 'Ingeniería Industrial', 10, 'Pregrado', 'Diurno', '103149', '000000', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `codigo` int(6) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inicio` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`codigo`, `nombre`, `descripcion`, `inicio`) VALUES
(0, 'Administrador del Sistema', 'Encargado del Mantenimiento del Portal', 'AD.Index'),
(1, 'Personal Administrativo', 'Encargado de una Dependencia', 'AD.Index'),
(2, 'Decano', 'Encargado de una Facultad', 'AD.Index'),
(3, 'Jefe de Programa', 'Encargado de un Programa', 'AD.Index'),
(4, 'Coordinador de Posgrado', 'Encargado de un Posgrado', 'AD.Index'),
(5, 'Coordinador de UOC', 'Encargado de una UOC', 'AD.Index'),
(6, 'Docente', 'Encargado de un Grupo', 'AD.Index'),
(7, 'Alumno', 'Matriculado en un Grupo', 'AD.Index'),
(8, 'Monitor', 'Encargado de un Tema', 'AD.Index'),
(9, 'Docente Cátedra', 'Encargado de un Grupo', 'AD.Index');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `uocs`
--

CREATE TABLE IF NOT EXISTS `uocs` (
  `programa` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `problemaFormacion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `propositoFormacion` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_UOC_Programa` (`programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `uocs`
--

INSERT INTO `uocs` (`programa`, `codigo`, `nombre`, `descripcion`, `problemaFormacion`, `propositoFormacion`) VALUES
('420-0017-01', 'AC', 'UOC Ambientes Computacionales', '', '', ''),
('420-0017-01', 'AP', 'UOC Algoritmia y Programación', '', '', ''),
('420-0017-01', 'CB', 'UOC Ciencias Básicas', '', '', ''),
('420-0017-01', 'CBI', 'UOC Ciencias Básicas de Ingeniería', '', '', ''),
('420-0017-01', 'IN', 'UOC Investigación', '', '', ''),
('420-0017-01', 'IS', 'UOC Ingeniería de Software', '', '', ''),
('420-0017-01', 'UM', 'UOC Universidad de Medellín', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `programa` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `identificacion` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `credenciales` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`identificacion`),
  KEY `fk_Usuario_Programa` (`programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`programa`, `identificacion`, `nombre`, `correo`, `clave`, `estado`, `credenciales`, `telefono`) VALUES
('420-0017-01', 'AD1234', 'DIANA MARIA HERNANDEZ', 'ad1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', '3012345678'),
('420-0017-01', 'AL1234', 'JUANES QUINTERO', 'al1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', '3023456789'),
('420-0017-01', 'CP1234', 'JESÚS ANDRÉS HINCAPIÉ', 'cp1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', NULL),
('420-0017-01', 'DE1234', 'CARLOS EDUARDO LÓPEZ', 'de1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', NULL),
('420-0017-01', 'DO1234', 'JUAN BERNARDO QUINTERO', 'do1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', '3078901234'),
('420-0017-01', 'JE1234', 'GLORIA GASCA', 'je1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', NULL),
(NULL, 'PA1234', 'JANETH SÁNCHEZ', 'pa1234@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Activo', '', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `fk_Actividad_Grupo` FOREIGN KEY (`semestre`, `grupo`) REFERENCES `grupos` (`semestre`, `codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Actividad_Docente` FOREIGN KEY (`docente`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Actividad_Observador` FOREIGN KEY (`observador`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Actividad_Programacion` FOREIGN KEY (`programacion`) REFERENCES `programaciones` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `agendagrupos`
--
ALTER TABLE `agendagrupos`
  ADD CONSTRAINT `fk_AgendaGrupo_Actividad` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `fk_Asignacion_Usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asignacion_Rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `fk_Asistencia_Usuario` FOREIGN KEY (`asistente`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asistencia_Actividad` FOREIGN KEY (`actividad`) REFERENCES `actividades` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `configuraciones`
--
ALTER TABLE `configuraciones`
  ADD CONSTRAINT `fk_Configuracion_Usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `fk_Grupo_Asignatura` FOREIGN KEY (`asignatura`) REFERENCES `asignaturas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `itemslista`
--
ALTER TABLE `itemslista`
  ADD CONSTRAINT `fk_ItemLista_Lista` FOREIGN KEY (`lista`) REFERENCES `listas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `fk_Lista_Modulo` FOREIGN KEY (`modulo`) REFERENCES `modulos` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_Notificacion_Usuario` FOREIGN KEY (`usuario`) REFERENCES `docentes` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `fk_Opcion_Modulo` FOREIGN KEY (`modulo`) REFERENCES `modulos` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `privilegios`
--
ALTER TABLE `privilegios`
  ADD CONSTRAINT `fk_Privilegio_Opcion` FOREIGN KEY (`opcion`) REFERENCES `opciones` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Privilegio_Rol` FOREIGN KEY (`rol`) REFERENCES `roles` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `programaciones`
--
ALTER TABLE `programaciones`
  ADD CONSTRAINT `fk_Programacion_Facultad` FOREIGN KEY (`facultad`) REFERENCES `facultades` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Programacion_Calendario` FOREIGN KEY (`semestre`) REFERENCES `calendarios` (`semestre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Programacion_Grupo` FOREIGN KEY (`semestre`, `grupo`) REFERENCES `grupos` (`semestre`, `codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Programacion_Programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Programacion_Usuario` FOREIGN KEY (`creador`) REFERENCES `usuarios` (`identificacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `programas`
--
ALTER TABLE `programas`
  ADD CONSTRAINT `fk_Programa_Facultad` FOREIGN KEY (`facultad`) REFERENCES `facultades` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `fk_Planes_Programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `uocs`
--
ALTER TABLE `uocs`
  ADD CONSTRAINT `fk_UOC_Programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `fk_Asignaturas_UOC` FOREIGN KEY(`uoc`) REFERENCES `uocs` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asignaturas_Plan` FOREIGN KEY(`plan`) REFERENCES `planes` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asignaturas_Programa` FOREIGN KEY(`programa`) REFERENCES `programas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_Usuario_Programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
