const express = require("express");
const {
  todoCamas,
  agregarCamas,
  borrarCamas,
  editarCamas,
  verCamas,
} = require("../controllers/camas");

const router = express.Router();

router.get("/camas", todoCamas);
router.post("/camas/agregar", agregarCamas);
router.delete("/camas/eliminar/:id", borrarCamas);
router.put("/camas/editar/:id", editarCamas);
router.get("/camas/:id", verCamas);

module.exports = router;