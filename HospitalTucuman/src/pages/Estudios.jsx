import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap';

const Estudios = () => {

const [estudios, setEstudios] = useState([])
const [pacientes,setPaciente] = useState([])



const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

    const getEstudios = async () => {
        let result = await axios.get("http://localhost:8000/estudios");
        console.log(result.data);
        setEstudios(result.data);
      };

      const getPacientes = async () => {
        let result = await axios.get("http://localhost:8000/pacientes");
        // console.log(result.data);
        setPaciente(result.data);
      };



      useEffect(() => {
        getEstudios()
       getPacientes()
      }, [])
      
  return (

    <>
    <Header/>
    <div className="container-titulo text-center mt-5">
        <h2>Agrega un Estudio </h2>
      </div>

      <div className="container-form">

      <Form>
<Row>
<FormGroup as={Col}>
            <Form.Label>Elije el paciente</Form.Label>
            <Form.Select
              >
                <option value="">Elija el paciente</option>
                {pacientes.map((paciente) => (
                  <option value={paciente.id_paciente} key={paciente.id_paciente}>
                    {paciente.nombre}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>
</Row>
<Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Ingresa tipo de estudio</Form.Label>
              <Form.Control
              value={""}
                type="text"
                placeholder="Estudio"
                
                />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Resultado</Form.Label>
              <Form.Control
              value={""}
                type="text"
                placeholder="Resultado"
               
                />
            </Form.Group>
                </Row>
                <Form.Label>Ingrese la fecha de realizacion</Form.Label>
              <Form.Control
                // value={fecha}
                type="date"
                placeholder="fecha"
                />
<Button variant="primary" type="submit">
                Agregar
              </Button>
      </Form>
      </div>
    <Container fluid className="tabla">
    <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID Estudio</th>
              <th>Nombre del paciente</th>
              <th>Tipo de estudio</th>
              <th>Resultado</th>
              <th>Fecha de Realizacion</th>
             
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {estudios.map((estudio) => (
              <tr key={estudio.id_estudioCompl}>
                <td>{estudio.id_estudioCompl}</td>
                <td>{estudio.nombre}</td>
                <td>{estudio.tipodeEstudio}</td>
                <td>{estudio.resultado}</td>
                <td>{formatDate(estudio.fechaRealizacion)}</td>
               

                <td>
                  <div className="d-flex justify-content-center gap-3 ">
                    <button className="bin-button" >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 39 7"
                        className="bin-top"
                      >
                        <line
                          strokeWidth="4"
                          stroke="white"
                          y2="5"
                          x2="39"
                          y1="5"
                        />
                        <line
                          strokeWidth="3"
                          stroke="white"
                          y2="1.5"
                          x2="26.0357"
                          y1="1.5"
                          x1="12"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 33 39"
                        className="bin-bottom"
                      >
                        <mask fill="white" id="path-1-inside-1_8_19">
                          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                        </mask>
                        <path
                          mask="url(#path-1-inside-1_8_19)"
                          fill="white"
                          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        />
                        <path strokeWidth="4" stroke="white" d="M12 6L12 29" />
                        <path strokeWidth="4" stroke="white" d="M21 6V29" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 89 80"
                        className="garbage"
                      >
                        <path
                          fill="white"
                          d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                        />
                      </svg>
                    </button>
                    <button className="editBtn"  >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    {/* <button className="btn-ver">
                      <i className="fa-solid fa-eye"></i>
                    </button> */}
                  </div>
                </td>
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

export default Estudios