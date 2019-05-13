
const connection = require('../database/config')

const controller = {}

controller.selectAll = (req, res) => {
    let query = 'SELECT * FROM caracteristicas'
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
    let query = `SELECT * FROM caracteristicas WHERE codigo = '${req.params.codigo}'`

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
    let caracteristica = [
        body.nombre,
        body.descripcion,
        body.tipo,
        body.estado,
        body.sesionesDirectas,
        body.sesionesIndirectas,
        body.espacio,
        body.grupo,
        body.medios,
        body.producto,
        body.evaluacion
    ]

    let query = `INSERT INTO caracteristicas
    (nombre, descripcion, tipo, estado, sesionesDirectas, sesionesIndirectas, espacio, grupo, medios, producto, evaluacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    connection.query(query, caracteristica, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.update = (req, res) => {
    let body = req.body

    let modifiedCaracteristica = [
        body.nombre,
        body.descripcion,
        body.tipo,
        body.estado,
        body.sesionesDirectas,
        body.sesionesIndirectas,
        body.espacio,
        body.grupo,
        body.medios,
        body.producto,
        body.evaluacion
    ]

    let query = `UPDATE caracteristicas 
    SET nombre = ?, descripcion = ?, tipo = ?, estado = ?, sesionesDirectas = ?, sesionesIndirectas = ?, espacio = ?, medios = ?, producto = ?, evaluacion = ?
    WHERE codigo = '${req.params.codigo}'`

    connection.query(query, modifiedCaracteristica, (error, result) => {
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
    let query = `DELETE FROM caracteristicas WHERE codigo = '${req.params.codigo}'`

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