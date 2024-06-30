const express = require("express");
const {
  todoEstudios,
  agregarEstudios,
  borrarEstudios,
  editarEstudios,
  verEstudios,
} = require("../controllers/estudios");

const router = express.Router();

router.get("/estudios", todoEstudios);
router.post("/estudios/agregar", agregarEstudios);
router.delete("/estudios/eliminar/:id", borrarEstudios);
router.put("/estudios/editar/:id", editarEstudios);
router.get("/estudios/:id", verEstudios);

module.exports = router;