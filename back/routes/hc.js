//importa express
const express = require("express");

//importa las funciones del archivo /controllers/hc
const {
  todoHistoriasClinicas,
  agregarHistoriasClinicas,
  borrarHistoriasClinicas,
  editarHistoriasClinicas,
  verHistoriasClinicas,
} = require("../controllers/hc");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/hc. metodo HTTP:get. funcion controladora: todoHistorialClinicas.
//Cuando se hace una solicitud GET a la ruta /hc, la función todoHistorialClinicas se ejecuta.
//Esta función devuelve las historias clinicas
//Y asi con todas las siguientes lineas
router.get("/hc", todoHistoriasClinicas);
router.post("/hc/agregar", agregarHistoriasClinicas);
router.delete("/hc/eliminar/:id", borrarHistoriasClinicas);
router.put("/hc/editar/:id", editarHistoriasClinicas);
router.get("/hc/:id", verHistoriasClinicas);

//exporta router
module.exports = router;
