const express = require("express")
const {todoPacientes} = require("../controllers/pacientes")

const router = express.Router()

router.get("/pacientes",todoPacientes)


module.exports = router