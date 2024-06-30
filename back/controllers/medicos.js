const { conection } = require("../config/db");

const todoMedicos = (req, res) => {
  const query = "select * from medicos";

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarMedicos = (req, res) => {
  console.log(req);

  const { nombre, especialidad, email, telefono, imagen } = req.body;

  const query = `INSERT INTO Medicos (nombre, especialidad, email, telefono, imagen) VALUES ("${nombre}","${especialidad}","${email}","${telefono}","${imagen}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarMedicos = (req, res) => {
  const id = req.params.id;
  const query = `delete from medicos where id_medico=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarMedicos = (req, res) => {
  const id = req.params.id;
  const { nombre, especialidad, email, telefono, imagen } = req.body;

  const query = `UPDATE medicos SET nombre = '${nombre}', especialidad = '${especialidad}', email = '${email}', telefono = '${telefono}', imagen = '${imagen}' WHERE id_medico = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verMedicos = (req, res) => {
  const id = req.params.id;
  const query = `select * from medicos where id_medico=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoMedicos,
  agregarMedicos,
  borrarMedicos,
  editarMedicos,
  verMedicos,
};
