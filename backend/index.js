/**
 * 
 */

 var express = require('express')
 var cors = require('cors')

 var app = express()

 app.use(express.json())
 app.use(express.static('../frontend'))
 app.use(express.urlencoded({
     extended : false
 }))

 app.use(cors())
 app.use('/', require('./routes/_index'))

 var port = 3000

 app.listen(port, () => console.log(`API running on http://localhost:${port}`))