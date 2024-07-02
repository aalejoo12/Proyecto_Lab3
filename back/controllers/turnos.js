//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los paramtros request y response
const todoTurnos = (req, res) => {
  //crea la query con el comando sql que sirve para ver los turnos con sus respectivos medicos y pacientes
  const query =
    "select m.id_medico, t.id_turno, p.id_paciente, p.nombre as NombrePaciente, t.fecha as Fecha, t.hora as Hora, m.nombre as Medico from Turnos t join Pacientes p on p.id_paciente = t.id_paciente join Medicos M on m.id_medico = t.id_medico";
  //ejecuta la consulta con la query y un callback aue maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los turnos en formato json
    res.json(results);
  });
};
//crea la funcion con los parametros request y response
const agregarTurnos = (req, res) => {
  //obtiene los valores del turno nuevo
  const { fecha, hora, id_medico, id_paciente } = req.body;
  //crea la query con el comando sql que sirve para agregar una fila a una tabla, y le pasa los valores que se obtuvieron en la linea anterior
  const query = `INSERT INTO turnos (fecha, hora, id_medico, id_paciente) VALUES ("${fecha}","${hora}",${id_medico},${id_paciente})`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con el nuevo turno
    res.send(results);
  });
};
//crea la funcion con los paramtros request y response
const borrarTurnos = (req, res) => {
  //obtiene el id del turno que se borrara
  const id = req.params.id;
  //crea la query con el comando sql que borra una fila de una tabla
  const query = `delete from turnos where id_turno=${id}`;
  //ejecuta la consulta con la query y un callback que manejara los resultado de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores envia los resultados con el turno borrado
    res.send(results);
  });
};
//crea la funcion con los paramtreos request y response
const editarTurnos = (req, res) => {
  //obtiene el id del turno a editar
  const id = req.params.id;
  //obtiene los nuevos valores del turno a editar
  const { fecha, hora, id_medico, id_paciente } = req.body;
  //crea la query con el comando sql que sirve para editar una fila de una tabla
  const query = `UPDATE turnos SET fecha = '${fecha}', hora = '${hora}', id_medico = ${id_medico}, id_paciente = ${id_paciente} WHERE id_turno = ${id}`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con el turno editado
    res.send(results);
  });
};
//crea la funcion con los parametros request y response
const verTurnos = (req, res) => {
  //obtiene el id del turno que quieren ver
  const id = req.params.id;
  //crea la query con el comando sql que muestra una fila de una tabla(la fila con el id que se obtuvo en la linea anterior)
  const query = `select * from turnos where id_turno=${id}`;
  //ejecuta la consulta con la query y un callback que maneja los resultados del a consutla
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecuicion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia/muestra el turno
    res.send(results);
  });
};
//exporta las funciones
module.exports = {
  todoTurnos,
  agregarTurnos,
  borrarTurnos,
  editarTurnos,
  verTurnos,
};
