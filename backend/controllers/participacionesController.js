/**
 * 
 */
const connection = require('../database/config')

const controller = {}

controller.selectAll = (req, res) => {
    let query = `SELECT * FROM participaciones`

    connection.query(query, (error, result) => {
        if (!error) {
            if (result.length) {
                res.status(200).send(result)
            } else {
                res.status(404).send({ error: "Not found" })
            }

        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.insert = (req, res) => {
    let body = req.body
    let participacion = [
        body.participante,
        body.tipo,
        body.estado,
        body.fecha,
        body.observaciones
    ]

    let query = `INSERT INTO participaciones
    (participante, tipo, estado, fecha, observaciones)
    VALUES (?, ?, ?, ?, ?)`

    connection.query(query, participacion, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}


module.exports = controller