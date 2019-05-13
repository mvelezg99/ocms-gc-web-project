/**
 * 
 */

const express = require('express')
const controller = require('../controllers/programasController')

const router = express.Router()

router.get('/programas/facultad/:codigo', controller.selectAllByFacultad)

module.exports = router