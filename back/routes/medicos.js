//importa express
const express = require("express");

//importa las funciones del archivo /controllers/medicos
const {
  todoMedicos,
  agregarMedicos,
  borrarMedicos,
  editarMedicos,
  verMedicos,
} = require("../controllers/medicos");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/medicos. metodo HTTP:get. funcion controladora: todoMedicos.
//Cuando se hace una solicitud GET a la ruta /medicos, la función todoMedicos se ejecuta.
//Esta función devuelve los medicos
//Y asi con todas las siguientes lineas
router.get("/medicos", todoMedicos);
router.post("/medicos/agregar", agregarMedicos);
router.delete("/medicos/eliminar/:id", borrarMedicos);
router.put("/medicos/editar/:id", editarMedicos);
router.get("/medicos/:id", verMedicos);

//exporta router
module.exports = router;
