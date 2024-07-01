import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Container, Table } from 'react-bootstrap'
import "../css/Paciente.css"



const VerPaciente = () => {

  const { id } = useParams();

  const [paciente,setPaciente] = useState([])


  const getPaciente = async () => {
    let result = await axios.get(`http://localhost:8000/pacientes/${id}`);
    console.log(result.data);
    setPaciente(result.data);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    getPaciente()

  }, [])
  

  return (
    <>    
    
    
    <Header/>
    <Container className="tabla-paciente tabla" fluid>

    <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Nombre del paciente</th>
              <th>Tipo de estudio</th>
              <th>Resultado</th>
              <th>Fecha de realización</th>
              <th>Grupo sanguíneo</th>
              <th>Peso</th>
              <th>Altura</th>
              <th>Fecha de ingreso</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paciente.map((paciente) => (
              <tr key={paciente.id_paciente}>
                <td>{paciente.nombre}</td>
                <td>{paciente.tipodeEstudio}</td>
                <td>{paciente.resultado}</td>
                <td>{formatDate(paciente.fechaRealizacion)}</td>
                <td>{paciente.grupoSanguineo}</td>
                <td>{paciente.peso}</td>
                <td>{paciente.altura}</td>
                <td>{formatDate(paciente.fechaIngreso)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Container>
    <Sidebar/>
    <Footer/> 
    </>

  )
}

export default VerPaciente