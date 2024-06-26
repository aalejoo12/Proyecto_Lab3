const express = require("express")
const {conection} = require("./config/db")
const pacientes = require("./routes/pacientes")
const logins = require("./routes/logins")
const cors = require("cors")

const app = express();

const port = 8000;

app.use("/",pacientes)
app.use("/",logins)
app.use(cors())

conection.connect(()=>{
    console.log("conectado a mi base de datos");
})

app.get("/",(req,res)=>{

    console.log("benvenute");
    res.send({message:"bienvenido a mi API"}) 
})


app.listen(port,()=>{
    console.log("escuchando "+port);
})



