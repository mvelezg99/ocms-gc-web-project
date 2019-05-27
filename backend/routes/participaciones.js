
const express = require('express')
const controller = require('../controllers/participacionesController')

const router = express.Router()

router.get('/participaciones', controller.selectAll)

router.post('/participaciones', controller.insert)

module.exports = router