const {conection} = require("../config/db")


const todoPacientes = (req, res)=>{
    
    const query = "select * from pacientes"

    conection.query(query,(err,results)=>{
        if(err) throw err
        res.json(results)

    })
}

module.exports= {todoPacientes}

