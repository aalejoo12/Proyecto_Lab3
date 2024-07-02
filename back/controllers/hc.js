//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const todoHistoriasClinicas = (req, res) => {
  //crea la query con el comando sql que muestra la historia clinica de los pacientes
  const query = `select p.id_paciente, p.nombre, h.id_historiaClinica, h.grupoSanguineo, h.alergias, h.peso, h.altura,h.fechaIngreso
from Pacientes p
join historiasclinicas h 
on h.id_paciente = p.id_paciente
where p.activo && h.activo = TRUE;`;

  //ejecuta la consulta con la query y un callback que maneja los resultados de la cunsulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay ningun error, envia los resultados de la query en formato json
    res.json(results);
  });
};

//Crea la funcion agregarHistoriasClinicas con los parametros request y response
const agregarHistoriasClinicas = (req, res) => {
  console.log(req)
  
  const { grupoSanguineo, alergias, peso, altura,fechaIngreso,id_paciente} = req.body;

  const query = `INSERT INTO historiasclinicas (grupoSanguineo, alergias, peso,altura ,id_paciente,fechaIngreso) VALUES ("${grupoSanguineo}","${alergias}","${peso}","${altura}", "${id_paciente}", "${fechaIngreso}")`;
  //ejecuta la consulta con la query y un callback para manejar los resultados de la consutla
  conection.query(query, (err, results) => {
    //Si es que hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados con la nueva historia clinica
    res.send(results);
  });
};

//crea la funcion con los parametros request y response
const borrarHistoriasClinicas = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  const query = `UPDATE HistoriasClinicas SET activo = FALSE WHERE id_historiaClinica = ${id}`;
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de la eliminacion
    res.send(results);
  });
};

//crea la funcion con los paramtros request y response
const editarHistoriasClinicas = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //obtiene los valores
  const { grupoSanguineo, alergias, peso, altura, fechaIngreso, id_paciente } =
    req.body;
  //crea la query con el comando sql que sirve para editar una linea de una tabla y le pasa los valores que obtuvo en la linea anterior
  const query = `UPDATE historiasclinicas SET gruposanguineo ="${grupoSanguineo}",alergias="${alergias}",peso="${peso}",altura="${altura}",fechaingreso="${fechaIngreso}",id_paciente= ${id_paciente} where  id_historiaClinica = ${id}`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de la edicion
    res.send(results);
  });
};
// crea la funcion con los paramtros request y response
const verHistoriasClinicas = (req, res) => {
  //obtiene el id
  const id = req.params.id;
  //crea la query con el comando sql que muestra la historia clinica del paciente que tiene el id que obtuvimos en la linea anterior
  const query = `select p.id_paciente, p.nombre, h.id_historiaClinica, h.grupoSanguineo, h.alergias, h.peso, h.altura,h.fechaIngreso
from Pacientes p
join historiasclinicas h 
on h.id_paciente = p.id_paciente
where p.id_paciente = ${id};`;
  //ejecuta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de la consulta
    res.send(results);
  });
};
//exporta las funciones
module.exports = {
  todoHistoriasClinicas,
  agregarHistoriasClinicas,
  borrarHistoriasClinicas,
  editarHistoriasClinicas,
  verHistoriasClinicas,
};
