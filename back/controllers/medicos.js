//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const todoMedicos = (req, res) => {
  const query = "SELECT * FROM Medicos WHERE activo = TRUE;";

  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los resultados de la consulta en formato json
    res.json(results);
  });
};
//crea la funcion con los paramtros request y response
const agregarMedicos = (req, res) => {
  //obtiene los valores
  const { nombre, especialidad, email, telefono, imagen } = req.body;
  //crea la query con el comando sql que sirve para añadir una linea a una tabla, y le pasa los valores que obtuvimos en la linea anterior
  const query = `INSERT INTO Medicos (nombre, especialidad, email, telefono, imagen) VALUES ("${nombre}","${especialidad}","${email}","${telefono}","${imagen}")`;
  //ejecuta la conexion con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con el nuevo medico
    res.send(results);
  });
};
//crea la funcion con los paramtros request y response
const borrarMedicos = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  const query = `UPDATE Medicos SET activo = FALSE WHERE id_medico = ${id}`;
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con el medico eliminado
    res.send(results);
  });
};
//crea la funcion con los parametros request y response
const editarMedicos = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //obtiene los valores nuevos
  const { nombre, especialidad, email, telefono, imagen } = req.body;
  //crea la query con el comando sql para editar una linea de codigo (del id que se obtuvo anteriormente), y la pasa los nuevos valores que se obtuvieron en la linea anterior
  const query = `UPDATE medicos SET nombre = '${nombre}', especialidad = '${especialidad}', email = '${email}', telefono = '${telefono}', imagen = '${imagen}' WHERE id_medico = ${id}`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con la nueva edicion
    res.send(results);
  });
};
//crea la funcion con los paramtros request y response
const verMedicos = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comnado sql que muestra una linea de la tabla medicos, la linea del id que obtuvimos en la linea anterior
  const query = `select * from medicos where id_medico=${id}`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay erroes, envia/muestra al medico
    res.send(results);
  });
};
//exporta las funciones
module.exports = {
  todoMedicos,
  agregarMedicos,
  borrarMedicos,
  editarMedicos,
  verMedicos,
};
