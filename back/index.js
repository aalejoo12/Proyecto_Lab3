//importa express, la conexion a la base de datos y los modulos de las rutas
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

//importa cors
const cors = require("cors");

//crea una variable app en la que almacena la instancia express
const app = express();

//crea una variable port que el servidor escuchara
const port = 8000;

//permite manejar solicutudes json
app.use(express.json());
//permite habilitar cors
app.use(cors());

//asocia cada modulo de rutas a la ruta raiz ('/')
//Esto significa que todas las rutas definidas en esos módulos estarán disponibles desde la raíz del servidor.
app.use("/", pacientes);
app.use("/", logins);
app.use("/", medicos);
app.use("/", turnos);
app.use("/", hc);
app.use("/", estudios);
app.use("/", camas);
app.use("/", salas);

//inicia la conexion a la base de datos y muestra un mensaje cuando la conexion es exitosa
conection.connect(() => {
  console.log("conectado a mi base de datos");
});

//Define una ruta GET en la raíz del servidor que imprime "benvenute" en la consola y responde con un mensaje JSON de bienvenida.
app.get("/", (req, res) => {
  console.log("benvenute");
  res.send({ message: "bienvenido a mi API" });
});

//Inicia el servidor y lo hace escuchar en el puerto definido (8000).
//Muestra un mensaje en la consola cuando el servidor está corriendo.
app.listen(port, () => {
  console.log("escuchando " + port);
});
