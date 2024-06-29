const mysql = require("mysql2")

const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"alejo_2018",
    database:"HospitalTucuman"

})


module.exports = {conection}

