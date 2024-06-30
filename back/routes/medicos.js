const express = require("express");
const {
  todoMedicos,
  agregarMedicos,
  borrarMedicos,
  editarMedicos,
  verMedicos,
} = require("../controllers/medicos");

const router = express.Router();

router.get("/medicos", todoMedicos);
router.post("/medicos/agregar", agregarMedicos);
router.delete("/medicos/eliminar/:id", borrarMedicos);
router.put("/medicos/editar/:id", editarMedicos);
router.get("/medicos/:id", verMedicos);

module.exports = router;
