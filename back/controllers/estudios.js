//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion todoEstudios con los parametros request y response
const todoEstudios = (req, res) => {
  //crea la query con el comando sql que muestra los estudios de los pacientes
  const query = `select p.id_paciente, p.nombre, e.id_estudioCompl, e.tipodeEstudio, e.resultado, e.fechaRealizacion
from Pacientes p
join estudioscompl e 
on e.id_paciente = p.id_paciente`;

  //ejecuta la consulta, el metodo query toma dos argumentos, el mismo query y un callback que maneja el resultado de la consulta
  conection.query(query, (err, results) => {
    //si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //Si no hay errores, se envían los resultados como una respuesta JSON
    res.json(results);
  });
};
//crea la funcion agregarEstudios con los parametros request y response
const agregarEstudios = (req, res) => {
  // obtiene los valores
  const { tipodeEstudio, resultado, fechaRealizacion, id_paciente } = req.body;

  //crea la query con el comando sql que añade una linea a la tabla y le da los valores que obtuvimos en la linea anterior
  const query = `INSERT INTO estudiosCompl (tipodeEstudio, resultado, fechaRealizacion , id_paciente) VALUES 
  ("${tipodeEstudio}","${resultado}","${fechaRealizacion}", "${id_paciente}")`;

  //ejecuta la consulta con el query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //Si no hay errores se envian los resultados con el estudio nuevo.
    res.send(results);
  });
};
//crea la funcion borrar estudios con los parametros request y response
const borrarEstudios = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comando sql que borra una linea de una tabla y pasa el id que obtuvo en la linea anterior
  const query = `delete from estudiosCompl where id_estudioCompl=${id}`;
  //ejecuta la consulta con el query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay ningun error envia los resultados con el estudio eliminado
    res.send(results);
  });
};

//Crea la funcion editarEstudios con los parametros request y response
const editarEstudios = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //obtiene los valores
  const { tipodeEstudio, resultado, fechaRealizacion, id_paciente } = req.body;
  //crea la query con el comando sql que sirve para editar valores de una linea de una tabla
  const query = `UPDATE estudiosCompl SET tipodeEstudio ="${tipodeEstudio}",resultado="${resultado}}",fecharealizacion="${fechaRealizacion}",id_paciente= ${id_paciente} where  id_estudioCompl = ${id}`;
  //ejecuta la consulta con el query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay ningun error envia los resultados con el estudio editado
    res.send(results);
  });
};
//Crea la funcion verEstudios con los parametros request y response
const verEstudios = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comando sql que muestra la linea de la tabla que contiene el id que se obtuvo en la linea anterior
  const query = `select * from estudiosCompl where id_estudioCompl=${id}`;
  //ejecuta la consulta con el query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay ningun error, envia el estudio
    res.send(results);
  });
};
//exporta las funciones
module.exports = {
  todoEstudios,
  agregarEstudios,
  borrarEstudios,
  editarEstudios,
  verEstudios,
};
