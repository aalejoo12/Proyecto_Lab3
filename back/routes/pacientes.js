const express = require("express")
const {todoPacientes,agregarPacientes, borrarPacientes} = require("../controllers/pacientes")

const router = express.Router()

router.get("/pacientes",todoPacientes)
router.post("/pacientes",agregarPacientes)
router.delete("/pacientes",borrarPacientes)



module.exports = router