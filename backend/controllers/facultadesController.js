/**
 * 
 */
const connection = require('../database/config')

const controller = {}

controller.selectAll = (req, res) => {
    let query = 'SELECT * FROM facultades'
    
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

module.exports = controller