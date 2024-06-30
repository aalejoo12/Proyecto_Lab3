const { conection } = require("../config/db");

const todoTurnos = (req, res) => {
    
  const query = "select * from Turnos";

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};  

const agregarTurnos = (req, res) => {
  console.log(req);

  const { fecha, hora, medico, paciente } = req.body;

  const fechaNueva = new Date(fecha).toISOString().split('T')[0]; // "2024-06-10"


  const query = `INSERT INTO Turnos (fecha, hora, id_medico, id_paciente) VALUES ("${fechaNueva}","${hora}",${medico},${paciente})`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarTurnos = (req, res) => {
  const id = req.params.id;
  const query = `delete from pacientes where id_Turnos=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarTurnos = (req, res) => {
  const id = req.params.id;
  const { nombre, edad, dni, email, telefono } = req.body;

  const query = `UPDATE Turnos SET nombre = '${nombre}', edad = '${edad}', dni = '${dni}', email = '${email}', telefono = '${telefono}' WHERE id_Turnos = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verTurnos = (req, res) => {
  const id = req.params.id;
  const query = `select * from Turnos where id_Turnos=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoTurnos,
  agregarTurnos,
  borrarTurnos,
  editarTurnos,
  verTurnos,
};
