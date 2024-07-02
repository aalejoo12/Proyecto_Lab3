//importa express
const express = require("express");

//importa las funciones del archivo /controllers/turnos
const {
  todoTurnos,
  agregarTurnos,
  borrarTurnos,
  editarTurnos,
  verTurnos,
} = require("../controllers/turnos");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/turnos. metodo HTTP:get. funcion controladora: todoTurnos.
//Cuando se hace una solicitud GET a la ruta /turnos, la función todoTurnos se ejecuta.
//Esta función devuelve los turnos
//Y asi con todas las siguientes lineas
router.get("/turnos", todoTurnos);
router.post("/turnos/agregar", agregarTurnos);
router.delete("/turnos/eliminar/:id", borrarTurnos);
router.put("/turnos/editar/:id", editarTurnos);
router.get("/turnos/:id", verTurnos);

//exporta router
module.exports = router;
