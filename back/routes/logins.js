const express = require("express")

const router = express.Router()

const {loguear} = require("../controllers/logins")



router.get("/login",loguear)

module.exports = router