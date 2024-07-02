//importa express
const express = require("express");

//crea la constante router que almacena la instancia del enrutador de express
const router = express.Router();

//importa la funcion loguear del archivo /controllers/logins
const { loguear } = require("../controllers/logins");

//asigna la ruta /login y la peticion http GET a la funcion controladora loguear
//esta funcion te loguea
router.get("/login", loguear);

//exporta router
module.exports = router;
