const { conection } = require("../config/db");

const todoSalas = (req, res) => {
  const query = `SELECT s.id_sala, s.tipoSala, COUNT(c.id_cama) AS cantidadCamas
FROM Salas s
LEFT JOIN Camas c
ON c.id_sala = s.id_sala AND c.activo = TRUE
WHERE s.activo = TRUE
GROUP BY s.id_sala;`

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const agregarSalas = (req, res) => {
  console.log(req);
  const {tipoSala, cantidadCamas } = req.body;

  const query = `INSERT INTO salas (tipoSala) VALUES 
  ("${tipoSala}")`;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const borrarSalas = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE Salas SET activo = FALSE WHERE id_sala = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const editarSalas = (req, res) => {
  const id = req.params.id;
  const {tipoSala} = req.body;


  const query = `UPDATE salas SET tipoSala ="${tipoSala}" where  id_sala = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const verSalas = (req, res) => {
  const id = req.params.id;
  const query = `select * from salas where id_sala=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  todoSalas,
  agregarSalas,
  borrarSalas,
  editarSalas,
  verSalas,
};
