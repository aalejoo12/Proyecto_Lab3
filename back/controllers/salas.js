//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const todoSalas = (req, res) => {
  const query = `SELECT s.id_sala, s.tipoSala, COUNT(c.id_cama) AS cantidadCamas
FROM Salas s
LEFT JOIN Camas c
ON c.id_sala = s.id_sala AND c.activo = TRUE
WHERE s.activo = TRUE
GROUP BY s.id_sala;`

  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los resultados de las salas en formato json
    res.json(results);
  });
};

//crea la funcion con los paramtros request y response
const agregarSalas = (req, res) => {
  //obtiene los valores de la sala que se añadira
  const { tipoSala, cantidadCamas } = req.body;

  const query = `INSERT INTO salas (tipoSala) VALUES 
  ("${tipoSala}")`;

  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error, detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber añadido la sala
    res.send(results);
  });
};

//crea la funcion con los parametros request y response
const borrarSalas = (req, res) => {
  //obtiene el id de la sala que se borrara
  const id = req.params.id;
  const query = `UPDATE Salas SET activo = FALSE WHERE id_sala = ${id}`;
  conection.query(query, (err, results) => {
    //si hay un error, detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber eliminado una sala
    res.send(results);
  });
};

//crea la funcion con los parametros request y response
const editarSalas = (req, res) => {
  //obtiene el id de la sala que se editara
  const id = req.params.id;
  const {tipoSala} = req.body;


  const query = `UPDATE salas SET tipoSala ="${tipoSala}" where  id_sala = ${id}`;
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con la cama editada
    res.send(results);
  });
};

//crea la funcion con los paramtetros request y response
const verSalas = (req, res) => {
  //obtiene el id de la sala que se quiere ver
  const id = req.params.id;
  //crea la query con el comando sql que sirve para mirar la sala que tiene el id obtenido en la linea anterior
  const query = `select * from salas where id_sala=${id}`;

  //ejecuta la consulta con la query y un callback que maneja los resultados de la consutla
  conection.query(query, (err, results) => {
    //si hay un error, detiene la ejecucion y señala que ha ocurrid un problema
    if (err) throw err;
    //si ni hay errores envia los resultados
    res.send(results);
  });
};

//exporta las funciones
module.exports = {
  todoSalas,
  agregarSalas,
  borrarSalas,
  editarSalas,
  verSalas,
};
