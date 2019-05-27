/**
 * @file Backend Gestión Asignaturas
 * @author Miguel Ángel Vélez <https://github.com/mvelezg99>
 * @version 0.1
 * @license MIT
 * 
 * @description Lógica escrita en javascript para el manejo del servidor y la base de datos del
 * proyecto OCMS Gestión curricular en el módulo de Gestión de Asignaturas.
 * 
 */

//----------------------------------- DATABASE/SERVER HANDLE -------------------------------------------------//
const express = require('express')
const controller = require('../controllers/asignaturasController')

const router = express.Router()
//-------------------------------------- PETITIONS HANDLE ----------------------------------------------------//


router.get('/asignaturas', controller.selectAll)

router.post('/asignaturas', controller.insert)

router.put('/asignaturas/:codigo', controller.update)

router.delete('/asignaturas/programa/:codigoPrograma/plan/:codigoPlan/asignatura/:codigoAsignatura', controller.deleteByProgramaByPlan)

router.get('/asignaturas/programa/:codigoPrograma/plan/:codigoPlan', controller.selectAllByProgramaByPlan)

router.get('/asignaturas/programa/:codigoPrograma/plan/:codigoPlan/asignatura/:codigoAsignatura', controller.selectOneByProgramaByPlan)

router.get('/asignaturas/uoc/:codigoUOC', controller.selectAllByUOC)

//----------------------------------------------------------------------------------------------------------//

module.exports = router
