
const express = require('express')
const controller = require('../controllers/caracteristicasController')

const router = express.Router()

router.get('/caracteristicas', controller.selectAll)

router.get('/caracteristicas/:codigo', controller.selectOne)

router.post('/caracteristicas', controller.insert)

router.put('/caracteristicas/:codigo', controller.update)

router.delete('/caracteristicas/:codigo', controller.delete)


module.exports = router