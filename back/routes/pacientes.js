//importa express
const express = require("express");

//importa las funciones del archivo /controllers/pacientes
const {
  todoPacientes,
  agregarPacientes,
  borrarPacientes,
  editarPacientes,
  verPacientes,
} = require("../controllers/pacientes");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//Cada línea asigna una ruta y un método HTTP a una función controladora que maneja la solicitud
// ruta:/pacientes. metodo HTTP:get. funcion controladora: todoPacientes.
//Cuando se hace una solicitud GET a la ruta /pacientes, la función todoPacientes se ejecuta.
//Esta función devuelve los pacientes
//Y asi con todas las siguientes lineas
router.get("/pacientes", todoPacientes);
router.post("/pacientes/agregar", agregarPacientes);
router.get("/pacientes/:id", verPacientes);
router.delete("/pacientes/eliminar/:id", borrarPacientes);
router.put("/pacientes/editar/:id", editarPacientes);

//exporta router
module.exports = router;
