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

var express = require('express')
var path = require('path')
var router = express.Router()

router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: '../frontend'})
})

router.use('/', require('./asignaturas'))

//----------------------------------------------------------------------------------------------------------//

module.exports = router