/**
 * 
 */

const connection = require('../database/config')

const controller = {}

controller.selectAll = (req, res) => {
    let query = 'SELECT * FROM asignaturas'
    
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

controller.selectAllByProgramaByPlan = (req, res) => {
    let query = `SELECT * FROM asignaturas WHERE programa = '${req.params.codigoPrograma}' AND plan = '${req.params.codigoPlan}'`

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

controller.selectOneByProgramaByPlan = (req, res) => {
    let query = `SELECT * FROM asignaturas WHERE programa = '${req.params.codigoPrograma}' AND plan = '${req.params.codigoPlan}' AND codigo = '${req.params.codigoAsignatura}'`

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
    let asignatura = [
        body.programa,
        body.uoc,
        body.plan,
        body.codigo,
        body.nombre,
        body.creditos,
        body.nivel,
        body.tipo,
        body.horasDirectas,
        body.horasIndependientes,
        body.descripcion,
    ]

    let query = `INSERT INTO asignaturas (programa, uoc, plan, codigo, nombre, creditos, nivel, tipo, horasDirectas, horasIndependientes, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(query, asignatura, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.update = (req, res) => {
    let body = req.body

    let asignatura = [
        body.programa,
        body.uoc,
        body.plan,
        body.codigo,
        body.nombre,
        body.creditos,
        body.nivel,
        body.tipo,
        body.horasDirectas,
        body.horasIndependientes,
        body.descripcion,
    ]

    let query = `UPDATE asignaturas SET programa = ?, uoc = ?, plan = ?, codigo = ?, nombre = ?, creditos = ?, nivel = ?, tipo = ?, horasDirectas = ?, horasIndependientes = ?, descripcion = ? WHERE codigo = '${req.params.codigo}'`

    connection.query(query, asignatura, (error, result) => {
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

controller.deleteByProgramaByPlan = (req, res) => {
    let query = `DELETE FROM asignaturas WHERE programa = '${req.params.codigoPrograma}' AND plan = '${req.params.codigoPlan}' AND codigo = '${req.params.codigoAsignatura}'`

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