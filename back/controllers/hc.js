const { conection } = require("../config/db");

const todoHistoriasClinicas = (req, res) => {
  const query = `select p.id_paciente, p.nombre, h.id_historiaClinica, h.grupoSanguineo, h.alergias, h.peso, h.altura,h.fechaIngreso
from Pacientes p
join historiasclinicas h 
on h.id_paciente = p.id_paciente`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarHistoriasClinicas = (req, res) => {
  console.log(req)
  const { grupoSanguineo, alergias, peso, altura,fechaIngreso,id_paciente } = req.body;

  const query = `INSERT INTO historiasclinicas (grupoSanguineo, alergias, peso,altura , fechaIngreso,id_paciente) VALUES ("${grupoSanguineo}","${alergias}","${peso}","${altura}","${fechaIngreso}", "${id_paciente}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarHistoriasClinicas = (req, res) => {
  const id = req.params.id;
  const query = `delete from historiasclinicas where id_historiaClinica=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarHistoriasClinicas = (req, res) => {
  const id = req.params.id;
  const { grupoSanguineo, alergias, peso, altura,fechaIngreso,id_paciente } = req.body;

  const query = `UPDATE historiasclinicas SET gruposanguineo ="${grupoSanguineo}",alergias="${alergias}",peso="${peso}",altura="${altura}",fechaingreso="${fechaIngreso}",id_paciente= ${id_paciente} where  id_historiaClinica = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verHistoriasClinicas = (req, res) => {
  const id = req.params.id;
  const query = `select p.id_paciente, p.nombre, h.id_historiaClinica, h.grupoSanguineo, h.alergias, h.peso, h.altura
from Pacientes p
join historiasclinicas h 
on h.id_paciente = p.id_paciente
where p.id_paciente = ${id};`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoHistoriasClinicas,
  agregarHistoriasClinicas,
  borrarHistoriasClinicas,
  editarHistoriasClinicas,
  verHistoriasClinicas,
};
