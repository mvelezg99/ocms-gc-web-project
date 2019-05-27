
const express = require('express')
const controller = require('../controllers/microcurriculosController')

const router = express.Router()

router.get('/microcurriculos', controller.selectAll)

router.post('/microcurriculos', controller.insert)

module.exports = router