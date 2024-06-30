const { conection } = require("../config/db");

const todoPacientes = (req, res) => {
  const query = "select * from pacientes";

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};  

const agregarPacientes = (req, res) => {
  console.log(req);

  const { nomyape, edad, dni, email, telefono } = req.body;

  const query = `INSERT INTO Pacientes (nombre, edad, dni, email, telefono) VALUES ("${nomyape}","${edad}","${dni}","${email}","${telefono}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarPacientes = (req, res) => {
  const id = req.params.id;
  const query = `delete from pacientes where id_paciente=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarPacientes = (req, res) => {
  const id = req.params.id;
  const { nombre, edad, dni, email, telefono } = req.body;

  const query = `UPDATE pacientes SET nombre = '${nombre}', edad = '${edad}', dni = '${dni}', email = '${email}', telefono = '${telefono}' WHERE id_paciente = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verPacientes = (req, res) => {
  const id = req.params.id;
  const query = `select * from pacientes where id_paciente=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoPacientes,
  agregarPacientes,
  borrarPacientes,
  editarPacientes,
  verPacientes,
};
