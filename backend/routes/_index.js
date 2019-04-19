
var express = require('express')
var path = require('path')
var router = express.Router()

router.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: '../frontend'})
})

router.use('/', require('./asignaturas'))

module.exports = router