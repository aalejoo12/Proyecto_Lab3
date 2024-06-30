const express = require("express");
const {
  todoHistoriasClinicas,
  agregarHistoriasClinicas,
  borrarHistoriasClinicas,
  editarHistoriasClinicas,
  verHistoriasClinicas,
} = require("../controllers/hc");

const router = express.Router();

router.get("/hc", todoHistoriasClinicas);
router.post("/hc/agregar", agregarHistoriasClinicas);
router.delete("/hc/eliminar/:id", borrarHistoriasClinicas);
router.put("/hc/editar/:id", editarHistoriasClinicas);
router.get("/hc/:id", verHistoriasClinicas);

module.exports = router;