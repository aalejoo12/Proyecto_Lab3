const mysql = require("mysql2");

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "facu1234",
  database: "HospitalTucuman",
});

module.exports = { conection };
