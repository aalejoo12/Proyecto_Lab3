// Importo mysql
const mysql = require("mysql2");

// Hago la conexion con la base de datos
const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"alejo_2018",
    database:"HospitalTucuman2"

})


module.exports = {conection}

