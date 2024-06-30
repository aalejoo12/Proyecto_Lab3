import { useEffect, useState } from "react";
import "../css/Main.css";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const Main = () => {
  const [pacientes, setPacientes] = useState([]);


  const [nomyape, setNomyape] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [internar, setInternar] = useState(0);
  const [opcion, setOpcion] = useState("");
  const [show, setShow] = useState(false);
  const [idAeliminar, setIdAEliminar] = useState(null);
  const [idActualizar, setIdActualizar] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);


  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };

  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    // console.log(result.data);
    setPacientes(result.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomyape && edad && email && dni && telefono != "" && internar != null) {
      handleChange();

      const response = axios.post("http://localhost:8000/pacientes/agregar", {
        nomyape: nomyape,
        edad: edad,
        email: email,
        dni: dni,
        telefono: telefono,
      });
      if (response) {
        alert("paciente creado");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
    setNomyape("");
    setEdad("");
    setEmail("");
    setDni("");
    setTelefono("");
    setInternar("");

    e.target.reset();
    getPacientes();
  };

  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true)

    let response = await axios.delete(
      `http://localhost:8000/pacientes/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Paciente eliminado correctamente");
    }
    getPacientes();
  };

  const handleChange = () => {

    // parte de agregar

    if (opcion === "SI") {
      setInternar(1);
    } else if (opcion === "NO") {
      setInternar(0);
    } else {
      setInternar(null);
    }
  };

  const handleActualizar = async (e) => {
    setMostrar(false)
    setMostrar2(true)
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8000/pacientes/editar/${idActualizar}`, {

        nombre: nomyape,
        edad: edad,
        email: email,
        dni: dni,
        telefono: telefono
      });
      if (response.status === 200) {
        alert("Paciente actualizado correctamente");
        getPacientes(); // Opcional: actualizar la lista después de la actualización
      }
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
    setNomyape("");
    setEdad("");
    setEmail("");
    setDni("");
    setTelefono("");
    setInternar("");

    getPacientes();

  }


  const handleEditar = async (id_paciente) => {
    setMostrar(true)
    setMostrar2(false)
    setIdActualizar(id_paciente)
    let result = await axios.get(`http://localhost:8000/pacientes/${id_paciente}`);

    console.log(result.data[0]);
    if (result) {

      setNomyape(result.data[0].nombre)
      setEdad(result.data[0].edad)
      setEmail(result.data[0].email)
      setDni(result.data[0].dni)
      setTelefono(result.data[0].telefono)
    }
    
  };

  useEffect(() => {
    getPacientes();
  }, []);

  // console.log({nomyape,edad,email,dni,telefono,internar});

  // console.log(opcion,internar);

  return (
    <>
      <div className="container-form">
        <Form className="form" onSubmit={handleSubmit} >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                value={nomyape}
                name="nomyape"
                type="text"
                placeholder="Ingresa nombre y apellido"
                onChange={(e) => {
                  setNomyape(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                value={edad}
                name="edad"
                type="number"
                placeholder="Edad"
                onChange={(e) => {
                  setEdad(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              value={dni}
              name="dni"
              type="number"
              placeholder="Ingrese DNI sin puntos"
              onChange={(e) => {
                setDni(e.target.value);
              }}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                value={telefono}
                name="telefono"
                type="number"
                placeholder="Teléfono"
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Internación</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setOpcion(e.target.value);
                }}
                defaultValue="Choose..."
              >
                <option value="">Elije</option>
                <option value={"SI"}>SI</option>
                <option value={"NO"}>NO</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>


            <div className="text-center mt-5">
              {mostrar2 &&<Button variant="primary" type="submit" onClick={handleChange}>
                Agregar
              </Button>}
              
              {mostrar &&<Button variant="warning" type="button" onClick={handleActualizar}>
                Actualizar
              </Button>}
              

            </div>



          </Row>
        </Form>
      </div>

      <Sidebar />

      <Container className="tabla" fluid>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Nombre y Apellido</th>
              <th>Edad</th>
              <th>Email</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pacientes.map((paciente) => (
              <tr key={paciente.id_paciente}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.email}</td>
                <td>{paciente.dni}</td>
                <td>{paciente.telefono}</td>
                <td>
                  <div className="d-flex justify-content-center gap-3 ">
                    <button
                      className="bin-button"
                      onClick={() => handleShow(paciente.id_paciente)}
                    >
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
                    <button className="editBtn" onClick={()=>handleEditar(paciente.id_paciente)}
                    >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <button className="btn-ver">
                      <i className="fa-solid fa-eye"></i>
                    </button>
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
    </>
  );
};

export default Main;
