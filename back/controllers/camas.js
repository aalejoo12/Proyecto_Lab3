//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const todoCamas = (req, res) => {
  const query = `select c.id_cama,c.fechaIngreso,c.fechaAlta,c.estado,s.tipoSala,s.id_sala
from Camas c 
join Salas s
on s.id_sala = c.id_sala
where c.activo && s.activo = TRUE 
order by c.estado`;

  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la conexion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los resultados de la consulta en un json
    res.json(results);
  });
};

//crea la funciom con los argumentos request y response
const agregarCamas = (req, res) => {
  //obtiene los valores de la nueva cama
  const { estado, fechaIngreso, fechaAlta, id_paciente, id_sala } = req.body;
  //crea la query con el comando sql que añade una cama a la tabla camas en la base de datos. y le agrega los valores de la linea anterior
  const query = `INSERT INTO camas (estado, fechaIngreso, fechaAlta, id_paciente, id_sala) VALUES 
  ("${estado}","${fechaIngreso}","${fechaAlta}",${id_paciente},${id_sala})`;

  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la conexion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber añadido a la nueva cama
    res.send(results);
  });
};

//crea la funciom con los argumentos request y response
const borrarCamas = (req, res) => {
  //obtiene el id de la cama que hay que borrar
  const id = req.params.id;
  const query = `UPDATE Camas SET activo = FALSE WHERE id_cama = ${id}`;
  conection.query(query, (err, results) => {
    //si hay un error detiene la conexion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de haber borrado una cama
    res.send(results);
  });
};

//crea la funcion con los parametros request y response
const editarCamas = (req, res) => {
  //obtiene el id de la cama que se editara
  const id = req.params.id;
  //obtiene los valores nuevos la cama que se editara
  const { estado, fechaIngreso, fechaAlta, id_paciente, id_sala } = req.body;

  //crea la query con el comando sql que edita una cama de la base de datos, y le pasa los valores que se obtuvieron en la linea anterior
  const query = `UPDATE camas SET estado="${estado}",fechaIngreso="${fechaIngreso}",fechaAlta="${fechaAlta}", id_paciente="${id_paciente}",id_sala="${id_sala}" where  id_cama = ${id}`;

  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, envia los resultados de la edicion
    res.send(results);
  });
};

//crea la funcion con los parametros request y response
const verCamas = (req, res) => {
  //obtiene el id de la cama que se quiere ver
  const id = req.params.id;

  //crea la query con el comando sql que muestra la informacion de la cama, su sala y su respectivo paciente
  const query = `select c.id_cama,c.fechaIngreso,c.fechaAlta,c.estado,p.nombre,s.tipoSala
from Camas c 
join Salas s
on s.id_sala = c.id_sala
join Pacientes p 
on p.id_paciente = c.id_paciente
where c.id_cama = ${id}
order by c.id_cama;
`;
  //ejecuta la consulta con la query y un callback que sirve para manejar los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los resultados de la consulta
    res.send(results);
  });
};

//exporta las funciones
module.exports = {
  todoCamas,
  agregarCamas,
  borrarCamas,
  editarCamas,
  verCamas,
};
