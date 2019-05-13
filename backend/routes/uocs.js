/**
 * 
 */

const express = require('express')
const controller = require('../controllers/uocsController')

const router = express.Router()

router.get('/uocs/programa/:codigo', controller.selectAllByPrograma)

module.exports = router