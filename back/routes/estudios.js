//Importa express
const express = require("express");

//importa las funciones de la carpeta controllers/estudios
const {
  todoEstudios,
  agregarEstudios,
  borrarEstudios,
  editarEstudios,
  verEstudios,
} = require("../controllers/estudios");

// crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/estudios. metodo HTTP:get. funcion controladora: todoEstudios.
//Cuando se hace una solicitud GET a la ruta /estudios, la función todoEstudios se ejecuta.
//Esta función devuelve una lista de todos los "estudios"
//Y asi con todas las siguientes lineas
router.get("/estudios", todoEstudios);
router.post("/estudios/agregar", agregarEstudios);
router.delete("/estudios/eliminar/:id", borrarEstudios);
router.put("/estudios/editar/:id", editarEstudios);
router.get("/estudios/:id", verEstudios);

//exporta router
module.exports = router;
