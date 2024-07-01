const { conection } = require("../config/db");

const todoEstudios = (req, res) => {
  const query = `select p.id_paciente, p.nombre, e.id_estudioCompl, e.tipodeEstudio, e.resultado, e.fechaRealizacion
from Pacientes p
join estudioscompl e 
on e.id_paciente = p.id_paciente
where p.activo && e.activo = TRUE
order by e.id_estudioCompl;`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarEstudios = (req, res) => {
  console.log(req);
  const { tipodeEstudio, resultado, fechaRealizacion, id_paciente } = req.body;

  const query = `INSERT INTO estudiosCompl (tipodeEstudio, resultado, fechaRealizacion , id_paciente) VALUES 
  ("${tipodeEstudio}","${resultado}","${fechaRealizacion}", "${id_paciente}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarEstudios = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE estudiosCompl SET activo = FALSE WHERE id_estudioCompl = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarEstudios = (req, res) => {
  const id = req.params.id;
  const { tipodeEstudio, resultado, fechaRealizacion, id_paciente } = req.body;


  const query = `UPDATE estudiosCompl SET tipodeEstudio ="${tipodeEstudio}",resultado="${resultado}}",fecharealizacion="${fechaRealizacion}",id_paciente= ${id_paciente} where  id_estudioCompl = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verEstudios = (req, res) => {
  const id = req.params.id;
  const query = `select * from estudiosCompl where id_estudioCompl=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoEstudios,
  agregarEstudios,
  borrarEstudios,
  editarEstudios,
  verEstudios,
};
