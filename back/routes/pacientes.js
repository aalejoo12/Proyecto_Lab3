const express = require("express")
const {todoPacientes} = require("../controllers/pacientes")

const router = express.Router()

router.get("/home",todoPacientes)


module.exports = router