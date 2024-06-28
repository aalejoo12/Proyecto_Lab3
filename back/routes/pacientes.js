const express = require("express")
const {todoPacientes,agregarPacientes} = require("../controllers/pacientes")

const router = express.Router()

router.get("/pacientes",todoPacientes)
router.post("/pacientes",agregarPacientes)


module.exports = router