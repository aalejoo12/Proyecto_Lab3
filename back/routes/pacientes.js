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
router.delete("/pacientes/eliminar/:id", borrarPacientes);
router.put("/pacientes/editar/:id", editarPacientes);
router.get("/pacientes/:id", verPacientes);

module.exports = router;
