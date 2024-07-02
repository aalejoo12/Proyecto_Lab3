//Importa express
const express = require("express");

//Importa las funciones del archivo controlador /camas
const {
  todoCamas,
  agregarCamas,
  borrarCamas,
  editarCamas,
  verCamas,
} = require("../controllers/camas");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/camas. metodo HTTP:get. funcion controladora: todoCamas.
//Cuando se hace una solicitud GET a la ruta /camas, la función todoCamas se ejecuta.
//Esta función devuelve una lista de todas las camas
//Y asi con todas las siguientes lineas
router.get("/camas", todoCamas);
router.post("/camas/agregar", agregarCamas);
router.delete("/camas/eliminar/:id", borrarCamas);
router.put("/camas/editar/:id", editarCamas);
router.get("/camas/:id", verCamas);

//exporta router
module.exports = router;
