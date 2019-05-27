
const nodemailer = require('nodemailer')
const connection = require('../database/config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ocms.gc@gmail.com',
        pass: 'ocmsgestioncurricular'
    }
})

const controller = {}

controller.selectAll = (req, res) => {
    let query = 'SELECT * FROM notificaciones'
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
    let notificacion = [
        body.usuario,
        body.evento,
        body.fecha,
        body.titulo,
        body.cuerpo,
        body.tipo
    ]

    let query = `INSERT INTO notificaciones
    (usuario, evento, fecha, titulo, cuerpo, tipo)
    VALUES (?, ?, ?, ?, ?, ?)`

    connection.query(query, notificacion, (error, result) => {
        if (!error) {
            res.status(200).send({ message: "INSERT successful!" })
        } else {
            res.status(400).send({ error: error })
        }
    })
}

controller.sendEmail = (req, res) => {
    let body = req.body


    let mailOptions = {
        from: 'ocms.gc@gmail.com',
        to: body.mail,
        subject: body.subject,
        text: body.text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send({ error: error })
        } else {
            res.status(200).send({ message: 'Email sent succesful' })
        }
    })

}

module.exports = controller