/**
 * 
 */
const express = require('express')
const controller = require('../controllers/facultadesController')

const router = express.Router()

router.get('/facultades', controller.selectAll)


module.exports = router