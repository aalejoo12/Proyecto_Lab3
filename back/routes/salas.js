const express = require("express");
const {
  todoSalas,
  agregarSalas,
  borrarSalas,
  editarSalas,
  verSalas,
} = require("../controllers/salas");

const router = express.Router();

router.get("/salas", todoSalas);
router.post("/salas/agregar", agregarSalas);
router.delete("/salas/eliminar/:id", borrarSalas);
router.put("/salas/editar/:id", editarSalas);
router.get("/salas/:id", verSalas);

module.exports = router;