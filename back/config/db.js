// Importo mysql
const mysql = require("mysql2");

// Hago la conexion con la base de datos
const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alejo2018",
  database: "HospitalTucuman",
});

// exporto la conexion con la base de datos
module.exports = { conection };
