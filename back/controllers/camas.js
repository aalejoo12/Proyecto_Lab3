const { conection } = require("../config/db");

const todoCamas = (req, res) => {
  const query = `select c.id_cama,c.fechaIngreso,c.fechaAlta,c.estado,s.tipoSala
from Camas c 
join Salas s
on s.id_sala = c.id_sala
order by c.id_cama`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarCamas = (req, res) => {
  console.log(req);
  const { estado, fechaIngreso, fechaAlta, id_paciente, id_sala } = req.body;

  const query = `INSERT INTO camas (estado, fechaIngreso, fechaAlta, id_paciente, id_sala) VALUES 
  ("${estado}","${fechaIngreso}","${fechaAlta}", "${id_paciente}","${id_sala}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarCamas = (req, res) => {
  const id = req.params.id;
  const query = `delete from camas where id_cama=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarCamas = (req, res) => {
  const id = req.params.id;
  const { estado, fechaIngreso, fechaAlta, id_paciente, id_sala } = req.body;


  const query = `UPDATE camas SET estado="${estado}",fechaIngreso="${fechaIngreso}",fechaAlta="${fechaAlta}", id_paciente="${id_paciente}",id_sala="${id_sala}" where  id_cama = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verCamas = (req, res) => {
  const id = req.params.id;
  const query = `select * from camas where id_cama=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoCamas,
  agregarCamas,
  borrarCamas,
  editarCamas,
  verCamas,
};
