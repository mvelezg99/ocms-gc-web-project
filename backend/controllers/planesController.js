/**
 * 
 */
const connection = require('../database/config')

const controller = {}

controller.selectAllByPrograma = (req, res) => {
    let query = `SELECT * FROM planes WHERE programa = '${req.params.codigo}'`

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

controller.selectOne = (req, res) => {
    let query = `SELECT * FROM planes WHERE codigo = '${req.params.codigo}'`

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
    let plan = [
        body.codigo,
        body.nombre,
        body.programa,
        body.numeroAcuerdo,
        body.semestreInicio,
        body.semestreVigencia,
        body.rutaActa,
        body.rutaImagen
    ]

    let query = `INSERT INTO planes (codigo, nombre, programa, numeroAcuerdo, semestreInicio, semestreVigencia, rutaActa, rutaImagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(query, plan, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.update = (req, res) => {
    let body = req.body

    let plan = [
        body.codigo,
        body.nombre,
        body.programa,
        body.numeroAcuerdo,
        body.semestreInicio,
        body.semestreVigencia,
        body.rutaActa,
        body.rutaImagen
    ]

    let query = `UPDATE planes SET codigo = ?, nombre = ?, programa = ?, numeroAcuerdo = ?, semestreInicio = ?, semestreVigencia = ?, rutaActa = ?, rutaImagen = ? WHERE codigo = '${req.params.codigo}'`

    connection.query(query, plan, (error, result) => {
        if (!error) {
            if (result.affectedRows) {
                res.status(200).send({ message: "UPDATE successful!" })
            } else {
                res.status(404).send({ error: "Not found" })
            }
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.delete = (req, res) => {
    let query = `DELETE FROM planes WHERE codigo = '${req.params.codigo}'`

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