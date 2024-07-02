//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const todoSalas = (req, res) => {
  //crea la query con el comando sql que sirve para mostrar la tabla salas
  const query = "select * from salas";

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

  //crea la query con el comando sql que sirve para añadir una sala a la tabla salas y le da los valores que obtuvo en la linea anterior
  const query = `INSERT INTO salas (tipoSala, cantidadCamas) VALUES 
  ("${tipoSala}","${cantidadCamas}")`;

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
  //crea la query con el comando sql que sirve para borrar una sala de la tabla salas
  const query = `delete from salas where id_sala=${id}`;

  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
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
  //obtiene los valores nuevos que obtendra la cama
  const { tipoSala, cantidadCamas } = req.body;

  //crea la query con el comando sql que sirve para editar los valores de una cama, y le pasa los valores obtenidos en la linea anterior
  const query = `UPDATE salas SET tipoSala ="${tipoSala}",cantidadCamas="${cantidadCamas}" where  id_sala = ${id}`;

  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
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
