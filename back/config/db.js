const mysql = require("mysql2")

const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"HospitalTucuman2"

})


module.exports = {conection}

