const express = require("express");
const { conection } = require("./config/db");
const pacientes = require("./routes/pacientes");
const logins = require("./routes/logins");
const medicos = require("./routes/medicos");
const turnos = require("./routes/turnos");
const hc = require("./routes/hc");
const estudios = require("./routes/estudios");
const camas = require("./routes/camas");
const salas = require("./routes/salas");



const cors = require("cors");

const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/", pacientes);
app.use("/", logins);
app.use("/", medicos);
app.use("/", turnos);
app.use ("/", hc)
app.use ("/", estudios)
app.use ("/", camas)
app.use ("/", salas)


conection.connect(() => {
  console.log("conectado a mi base de datos");
});

app.get("/", (req, res) => {
  console.log("benvenute");
  res.send({ message: "bienvenido a mi API" });
});

app.listen(port, () => {
  console.log("escuchando " + port);
});
