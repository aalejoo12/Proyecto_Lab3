//importa la conexion con la base de datos
const { conection } = require("../config/db");
//crea la funcion con los paramtros request y response
const todoPacientes = (req, res) => {
  const query = "SELECT * FROM Pacientes WHERE activo = TRUE;";

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
  const query = `UPDATE Pacientes SET activo = FALSE WHERE id_paciente = ${id}`;
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
  const query = `SELECT p.id_paciente, p.nombre, e.tipodeEstudio, e.resultado, e.fechaRealizacion, h.grupoSanguineo, h.alergias, h.peso, h.altura, h.fechaIngreso
FROM Pacientes p
JOIN estudiosCompl e ON e.id_paciente = p.id_paciente
JOIN historiasClinicas h ON h.id_paciente = p.id_paciente
WHERE p.id_paciente = ${id} AND e.activo = TRUE AND h.activo = TRUE;`;
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
