/**
 * @file Backend Gestión Curricular
 * @author Miguel Ángel Vélez <https://github.com/mvelezg99>
 * @version 0.1
 * @license MIT
 * 
 * @description Lógica escrita en javascript para el manejo del servidor y la base de datos del
 * proyecto OCMS Gestión curricular.
 * 
 */

 //----------------------------------- DATABASE/SERVER HANDLE -------------------------------------------------//

const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: '../frontend'})
})

router.use('/', require('./asignaturas'))
router.use('/', require('./facultades'))
router.use('/', require('./programas'))
router.use('/', require('./planes'))
router.use('/', require('./uocs'))
router.use('/', require('./prerrequisitos'))
router.use('/', require('./caracteristicas'))
router.use('/', require('./docentes'))
router.use('/', require('./microcurriculos'))
router.use('/', require('./participaciones'))
router.use('/', require('./notificaciones'))

//----------------------------------------------------------------------------------------------------------//

module.exports = router