
const express = require('express')
const controller = require('../controllers/notificacionesController')

const router = express.Router()

router.get('/notificaciones', controller.selectAll)

router.post('/notificaciones', controller.insert)

router.post('/notificaciones/sendemail', controller.sendEmail)


module.exports = router