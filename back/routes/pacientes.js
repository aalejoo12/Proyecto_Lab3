const express = require("express");
const {
  todoPacientes,
  agregarPacientes,
  borrarPacientes,
  editarPacientes,
  verPacientes,
} = require("../controllers/pacientes");

const router = express.Router();

router.get("/pacientes", todoPacientes);
router.post("/pacientes/agregar", agregarPacientes);
router.get("/pacientes/:id", verPacientes);
router.delete("/pacientes/eliminar/:id", borrarPacientes);
router.put("/pacientes/editar/:id", editarPacientes);

module.exports = router;
