//importa la conexion con la base de datos
const { conection } = require("../config/db");
//crea la funcion con los paramtros request y response
const todoPacientes = (req, res) => {
  //crea la query con el comando sql que sirve para mostrar la tabla pacientes
  const query = "select * from pacientes";
  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los pacientes en formato json
    res.json(results);
  });
};
//crea la funcion con los parametros request y response
const agregarPacientes = (req, res) => {
  //obtiene los valores del nuevo paciente
  const { nomyape, edad, dni, email, telefono } = req.body;
  //crea la query con el comando sql que sirve para añadir una linea a una tabla, y le pasa los valores que se obtuvieron en la linea anterior
  const query = `INSERT INTO Pacientes (nombre, edad, dni, email, telefono) VALUES ("${nomyape}","${edad}","${dni}","${email}","${telefono}")`;
  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la conexion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber añadido al paciente
    res.send(results);
  });
};
//crea la funcion con los paramteros request y response
const borrarPacientes = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comando sql que sirve para borrar una fila de una tabla, borra la que tiene el id que se obtuvo en la linea anterior
  const query = `delete from pacientes where id_paciente=${id}`;
  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hya errores, envia los resultados de haber borrado al paciente
    res.send(results);
  });
};
//crea la funcion con los paramtrs request y response
const editarPacientes = (req, res) => {
  //obiene el id
  const id = req.params.id;
  //ovitene los valores nuevos para editar al paciente
  const { nombre, edad, dni, email, telefono } = req.body;
  //crea la query con el comando sql que sirve para editar una fila(del id que se obtuvo anteriormente) de una tabla, le pasa los valores que se obtuvieron en la linea anterior
  const query = `UPDATE pacientes SET nombre = '${nombre}', edad = '${edad}', dni = '${dni}', email = '${email}', telefono = '${telefono}' WHERE id_paciente = ${id}`;
  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber editado al paciente
    res.send(results);
  });
};
//crea la funcion con los paramtros request y response
const verPacientes = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comando sql que sirve para ver una linea de una tabla, la linea del id que se obtuvo en la linea anterior
  const query = `select * from pacientes where id_paciente=${id}`;
  //ejecuta la consulta con la query y un callback que sirve para manejar los reusultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la conexion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia/muestra al paciente
    res.send(results);
  });
};
//exporta las funciones
module.exports = {
  todoPacientes,
  agregarPacientes,
  borrarPacientes,
  editarPacientes,
  verPacientes,
};
