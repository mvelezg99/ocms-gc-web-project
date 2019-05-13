/**
 * 
 */

const express = require('express')
const controller = require('../controllers/planesController')

const router = express.Router()

router.get('/planes/programa/:codigo', controller.selectAllByPrograma)

router.get('/planes/:codigo', controller.selectOne)

router.post('/planes', controller.insert)

router.put('/planes/:codigo', controller.update)

router.delete('/planes/:codigo', controller.delete)

module.exports = router