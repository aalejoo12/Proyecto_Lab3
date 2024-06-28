const {conection} = require("../config/db")


const todoPacientes = (req, res)=>{
    
    const query = "select * from pacientes"

    conection.query(query,(err,results)=>{
        if(err) throw err
        res.json(results)

    })
}

const agregarPacientes = (req, res)=>{

    console.log(req);

    const {nomyape,edad,dni,email,telefono} = req.body
    
   const query = `INSERT INTO Pacientes (nombre, edad, dni, email, telefono) VALUES ("${nomyape}","${edad}","${dni}","${email}","${telefono}")`

    conection.query(query,(err,results)=>{
        if(err) throw err
        res.send(results)

    })


}

module.exports= {todoPacientes, agregarPacientes}

