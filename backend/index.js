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

//-------------------------------------- SETTING UP SERVER ---------------------------------------------------//
 var express = require('express')
 var cors = require('cors')

 var app = express()

 app.use(express.json())
 app.use(express.static('../frontend'))
 app.use(express.urlencoded({
     extended : false
 }))

 app.use(cors())
 app.use('/', require('./routes/_index'))

 var port = 3000

 app.listen(port, () => console.log(`API running on http://localhost:${port}`))

 //------------------------------------------------------------------------------------------------------------//