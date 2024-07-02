//Importa express
const express = require("express");

//importa las funciones del archivo controlador /salas.js
const {
  todoSalas,
  agregarSalas,
  borrarSalas,
  editarSalas,
  verSalas,
} = require("../controllers/salas");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/salas. metodo HTTP:get. funcion controladora: todoSalas.
//Cuando se hace una solicitud GET a la ruta /salas, la función todoSalas se ejecuta.
//Esta función devuelve las salas
//Y asi con todas las siguientes lineas
router.get("/salas", todoSalas);
router.post("/salas/agregar", agregarSalas);
router.delete("/salas/eliminar/:id", borrarSalas);
router.put("/salas/editar/:id", editarSalas);
router.get("/salas/:id", verSalas);

//exporta el router
module.exports = router;
