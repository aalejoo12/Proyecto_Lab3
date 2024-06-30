const { conection } = require("../config/db");

const todoTurnos = (req, res) => {
  const query = "select p.id_paciente, p.nombre as NombrePaciente, t.fecha as Fecha, t.hora as Hora, m.nombre as Medico from Turnos t join Pacientes p on p.id_paciente = t.id_paciente join Medicos M on m.id_medico = t.id_medico";

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarTurnos = (req, res) => {
  console.log(req);

  const { fecha, hora, id_medico, id_paciente } = req.body;

  const query = `INSERT INTO turnos (fecha, hora, id_medico, id_paciente) VALUES ("${fecha}","${hora}",${id_medico},${id_paciente})`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarTurnos = (req, res) => {
  const id = req.params.id;
  const query = `delete from turnos where id_turno=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarTurnos = (req, res) => {
  const id = req.params.id;
  const { fecha, hora, id_medico, id_paciente } = req.body;

  const query = `UPDATE turnos SET fecha = '${fecha}', hora = '${hora}', id_medico = ${id_medico}, id_paciente = ${id_paciente} WHERE id_turno = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verTurnos = (req, res) => {
  const id = req.params.id;
  const query = `select * from turnos where id_turno=${id}`;
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
