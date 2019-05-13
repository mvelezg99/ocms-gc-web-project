const connection = require('../database/config')

const controller = {}

controller.selectAllByAsignatura = (req, res) => {
    let query = `SELECT *
    FROM asignaturasprerrequisitos
    JOIN asignaturas ON asignaturasprerrequisitos.prerrequisito = asignaturas.codigo
    WHERE asignaturasprerrequisitos.asignatura = '${req.params.codigoAsignatura}'`

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
    let asignaturaPrerrequisito = [
        body.asignatura,
        body.prerrequisito
    ]

    let query = `INSERT INTO asignaturasprerrequisitos (asignatura, prerrequisito) VALUES (?, ?)`

    connection.query(query, asignaturaPrerrequisito, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.delete = (req, res) => {
    let query = `DELETE FROM asignaturasprerrequisitos WHERE id = '${req.params.id}'`

    connection.query(query, (error, result) => {
        if (!error) {
            if (result.affectedRows) {
                res.status(200).send({ message: "DELETE successful!" })
            } else {
                res.status(404).send({ error: "Not found" })
            }
        } else {
            res.status(400).send({ error: error })
        }
    })
}

module.exports = controller