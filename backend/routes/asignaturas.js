/**
 * 
 */

//----------------------------------------------------------------------------------------------------------//
var express = require('express')
var mysql = require('mysql')

var router = express.Router()

var connection = mysql.createConnection({
    host: "localhost",
    user: "ocms_admin",
    password: "ocms_admin",
    database: "ocms"
})
connection.connect((error) => {
    if (error) throw error
})
//----------------------------------------------------------------------------------------------------------//


router.get('/asignaturas', (req, res) => {
    let query = 'SELECT * FROM asignaturas'

    connection.query(query, (error, result) => {
        if (!error) {
            res.status(200).send(result)
        } else {
            res.status(400).send({ error: error })
            throw error
        }
    })
})

router.get('/asignaturas/:codigo', (req, res) => {
    let query = `SELECT * FROM asignaturas WHERE codigo = '${req.params.codigo}'`

    connection.query(query, (error, result) => {
        if (!error) {
            if (result.length) {
                res.status(200).send(result)
            } else {
                res.status(404).send({ message: "Not found" })
            }

        } else {
            res.status(400).send({ error: error })
            throw error
        }
    })
})

router.post('/asignaturas', (req, res) => {
    let body = req.body
    let asignatura = [
        body.codigo,
        body.nombre,
        body.creditos,
        body.nivel,
        body.tipo,
        body.horasDirectas,
        body.horasIndependientes,
        body.descripcion,
    ]

    let query = `INSERT INTO asignaturas (codigo, nombre, creditos, nivel, tipo, horasDirectas, horasIndependientes, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(query, asignatura, (error, result) => {
        if (!error) {
            res.status(200).send({message: "INSERT successful!"})
        } else {
            res.status(400).send({ error: error })
            throw error
        }
    })
})

router.put('/asignaturas/:codigo', (req, res) => {
    let body = req.body

    let asignatura = [
        body.codigo,
        body.nombre,
        body.creditos,
        body.nivel,
        body.tipo,
        body.horasDirectas,
        body.horasIndependientes,
        body.descripcion,
    ]

    let query = `UPDATE asignaturas SET codigo = ?, nombre = ?, creditos = ?, nivel = ?, tipo = ?, horasDirectas = ?, horasIndependientes = ?, descripcion = ? WHERE codigo = '${req.params.codigo}'`

    connection.query(query, asignatura, (error, result) => {
        if (!error) {
            if (result.affectedRows) {
                res.status(200).send({message: "UPDATE successful!"})
            } else {
                res.status(404).send({ error: "Not found" })
            }
        } else {
            res.status(400).send({ error: error })
            throw error
        }
    })

})

router.delete('/asignaturas/:codigo', (req, res) => {
    let query = `DELETE FROM asignaturas WHERE codigo = '${req.params.codigo}'`

    connection.query(query, (error, result) => {
        if (!error) {
            if (result.affectedRows) {
                res.status(200).send({message: "DELETE successful!"})
            } else {
                res.status(404).send({ error: "Not found" })
            }
        } else {
            res.status(400).send({ error: error })
            throw error
        }
    })
})

//----------------------------------------------------------------------------------------------------------//

module.exports = router
