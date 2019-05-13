/**
 * 
 */

const mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost",
    user: "ocms_admin",
    password: "ocms_admin",
    database: "ocms"
})
connection.connect((error) => {
    if (error) throw error
})

module.exports = connection