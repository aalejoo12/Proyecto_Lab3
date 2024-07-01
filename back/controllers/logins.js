//importa la conexion a la base de datos
const { conection } = require("../config/db");

//crea la funcion con los parametros request y response
const loguear = (req, res) => {
  //crea la query con el comando sql que sirve para mostrar la tabla usuarios
  const query = "select * from usuarios";

  //ejeculta la consulta con la query y un callback que maneja los resultados de la consulta
  conection.query(query, (err, results) => {
    //si hay un error detiene la ejecucion y señala que ha ocurrido un problema
    if (err) throw err;
    //si no hay errores, muestra los resultados de la consulta en formato json
    res.json(results);
  });
};
//exporta la funcion loguear
module.exports = { loguear };
