const express = require('express')
const controller = require('../controllers/prerrequisitosController')

const router = express.Router()

router.get('/prerrequisitos/asignatura/:codigoAsignatura', controller.selectAllByAsignatura)

router.post('/prerrequisitos', controller.insert)

router.delete('/prerrequisitos/:id', controller.delete)

module.exports = router