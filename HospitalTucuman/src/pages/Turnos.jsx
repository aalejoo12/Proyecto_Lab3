import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../css/Turnos.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Turnos = () => {

  const [turnos, setTurnos] = useState([]);
  const [id_paciente, setId_paciente] = useState(null)
  const [id_medico, setId_medico] = useState(null)
  const [hora, setHora] = useState(null)
  const [fecha, setFecha] = useState(null)
  const [show, setShow] = useState(false);
  const [idAeliminar, setIdAEliminar] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);
  const [idActualizar, setIdActualizar] = useState(null);
  const [pacientes, setPacientes] = useState([])
  const [medicos, setMedicos] = useState([])



  const getTurnos = async () => {
    let result = await axios.get("http://localhost:8000/turnos");
    console.log(result.data);
    setTurnos(result.data);
  };

  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    console.log(result.data);
    setPacientes(result.data);
  };

  const getMedicos = async () => {
    let result = await axios.get("http://localhost:8000/medicos");
    console.log(result.data);
    setMedicos(result.data);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (id_paciente && id_medico && hora && fecha != null) {

      const response = axios.post("http://localhost:8000/turnos/agregar", {
        id_paciente: id_paciente,
        id_medico: id_medico,
        hora: hora,
        fecha: fecha
      });
      if (response) {
        alert("turno creado");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
    setId_paciente("");
    setId_medico("");
    setFecha("");
    setHora("");

    e.target.reset();
    getTurnos();
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true)

    let response = await axios.delete(
      `http://localhost:8000/turnos/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Turno eliminado correctamente");
    }
    getTurnos();
  };

  const handleEditar = async (id) => {
    setMostrar(true)
    setMostrar2(false)
    setIdActualizar(id)

    let result = await axios.get(`http://localhost:8000/turnos/${id}`);
    const turno = result.data;
    console.log(turno[0]);

    if (result) {
      const fecha = new Date(turno[0].fecha);

      const fechaFormateada = fecha.toISOString().split('T')[0];


      setFecha(fechaFormateada)
      setHora(turno[0].hora)
      setId_paciente(turno[0].id_paciente)
      setId_medico(turno[0].id_medico)
    }
  };

  const handleActualizar = async (e) => {

    getTurnos();

    setMostrar(false)
    setMostrar2(true)
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8000/turnos/editar/${idActualizar}`, {
        fecha: fecha,
        hora: hora,
        id_medico: id_medico,
        id_paciente: id_paciente
      });
      if (response.status === 200) {
        alert("Paciente actualizado correctamente");
        getTurnos();
      }
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }

    setId_paciente("");
    setId_medico("");
    setFecha("");
    setHora("");

    getTurnos();

  }

  useEffect(() => {
    getTurnos();
    getPacientes()
    getMedicos()

  }, []);

  return (
    <>
      <Header />
      <div className="container-titulo text-center mt-5">
        <h2>Agrega un Turno</h2>
      </div>

      <div className="container-form">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Ingrese el paciente</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setId_paciente(e.target.value);
                }}
                defaultValue=""
              >
                <option value="">Elije el paciente</option>
                {pacientes.map((paciente) => (
                  <option value={paciente.id_paciente} key={paciente.id_paciente}>
                    {paciente.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Ingrese el Médico</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setId_medico(e.target.value);
                }}
                defaultValue=""
              >
                <option value="">Elije el médico</option>
                {medicos.map((medico) => (
                  <option value={medico.id_medico} key={medico.id_medico}>
                    {medico.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Ingrese la fecha del turno</Form.Label>
              <Form.Control value={fecha} type="date" placeholder="Fecha del Turno" onChange={(e) => { setFecha(e.target.value) }} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
              <Form.Label>Horario del turno</Form.Label>
              <Form.Control value={hora} type="time" placeholder="Hora" onChange={(e) => {
                setHora(e.target.value)
              }} />
            </Form.Group>
          </Row>
          {mostrar2 && <Button variant="primary" type="submit">
            Agregar
          </Button>}

          {mostrar && <Button variant="warning" type="button" onClick={handleActualizar}>
            Actualizar
          </Button>}
        </Form>
      </div>

      <Container fluid className="tabla">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID del Turno</th>
              <th>Nombre del Paciente</th>
              <th>Fecha del turno</th>
              <th>Hora del turno</th>
              <th>Médico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {turnos.map((turno) => (
              <tr key={turno.id_turno}>
                <td>{turno.id_turno}</td>
                <td>{turno.NombrePaciente}</td>
                <td>{formatDate(turno.Fecha)}</td>
                <td>{turno.Hora}</td>
                <td>{turno.Medico}</td>
                <td>
                  <div className="d-flex justify-content-center gap-3 ">
                    <button className="bin-button" onClick={() => handleShow(turno.id_turno)}>
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
                    <button className="editBtn" onClick={() => handleEditar(turno.id_turno)} >
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
        <Modal show={show}>
          <Modal.Header closeButton>
            <Modal.Title>¡Cuidado!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro que quieres eliminar el paciente?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEliminar}>
              SI
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleClose(false);
              }}
            >
              NO
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <Sidebar />
      <Footer />
    </>
  );

};

export default Turnos;
