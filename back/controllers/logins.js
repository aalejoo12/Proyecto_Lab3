const {conection} = require("../config/db")

const loguear = (req,res) =>{

    const query = "select * from usuarios"

    conection.query(query,(err,results)=>{
        if(err) throw err
        res.json(results)

    })
}

module.exports= {loguear}

