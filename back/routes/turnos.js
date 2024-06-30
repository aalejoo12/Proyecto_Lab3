const express = require("express");
const {
  todoTurnos,
  agregarTurnos,
  borrarTurnos,
  editarTurnos,
  verTurnos,
} = require("../controllers/turnos");

const router = express.Router();

router.get("/turnos", todoTurnos);
router.post("/turnos/agregar", agregarTurnos);
router.delete("/turnos/eliminar/:id", borrarTurnos);
router.put("/turnos/editar/:id", editarTurnos);
router.get("/turnos/:id", verTurnos);

module.exports = router;