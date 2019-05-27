

const express = require('express')
const controller = require('../controllers/docentesController')

const router = express.Router()

router.get('/docentes/uoc/:codigoUOC', controller.selectAllByUOC)

module.exports = router