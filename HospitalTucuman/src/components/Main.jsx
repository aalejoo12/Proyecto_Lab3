import { useEffect, useState } from "react"; // Importación de hooks de React
import "../css/Main.css"; // Importación de estilos
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap"; // Importación de componentes de react-bootstrap
import axios from "axios"; // Importación de axios para hacer peticiones HTTP
import Sidebar from "./Sidebar"; // Importación del componente Sidebar
import { Link } from "react-router-dom"; // Importación de Link de react-router-dom

const Main = () => {
  // Definición del estado del componente usando useState
  const [pacientes, setPacientes] = useState([]);

  const [nomyape, setNomyape] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [internar, setInternar] = useState(null);
  const [show, setShow] = useState(false);
  const [idAeliminar, setIdAEliminar] = useState(null);
  const [idActualizar, setIdActualizar] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);

  // Funciones para manejar el estado de la modal
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };

  // Función para obtener los pacientes de la API
  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    setPacientes(result.data);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomyape && edad && email && dni && telefono != "") {

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
    // Limpiar los campos del formulario
    setNomyape("");
    setEdad("");
    setEmail("");
    setDni("");
    setTelefono("");
    setInternar("");

    e.target.reset();
    getPacientes();
  };

  // Función para eliminar un paciente
  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true);

    let response = await axios.delete(
      `http://localhost:8000/pacientes/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Paciente eliminado correctamente");
    }
    getPacientes();
  };


  // Función para actualizar un paciente
  const handleActualizar = async (e) => {
    getPacientes();

    setMostrar(false);
    setMostrar2(true);
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/pacientes/editar/${idActualizar}`, {

        nombre: nomyape,
        edad: edad,
        email: email,
        dni: dni,
        telefono: telefono,
      });
      if (response.status === 200) {
        alert("Paciente actualizado correctamente");
        getPacientes(); // Opcional: actualizar la lista después de la actualización
      }
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
    // Limpiar los campos del formulario
    setNomyape("");
    setEdad("");
    setEmail("");
    setDni("");
    setTelefono("");

    getPacientes();
  };

  // Función para editar un paciente
  const handleEditar = async (id_paciente) => {
    setMostrar(true);
    setMostrar2(false);
    setIdActualizar(id_paciente);
    let result = await axios.get("http://localhost:8000/pacientes");

    // Buscamos el médico correspondiente al id_medico proporcionado
    const paciente = result.data.find((m) => m.id_paciente === id_paciente);

    if (paciente) {
      setNomyape(paciente.nombre);
      setEdad(paciente.edad);
      setEmail(paciente.email);
      setDni(paciente.dni);
      setTelefono(paciente.telefono);
    }
  };

  // Efecto para obtener los pacientes al montar el componente
  useEffect(() => {
    getPacientes();
  }, []);


  console.log(internar);

  return (
    <>
      {" "}
      {/* Título */}
      <div className="text-center mt-5 container-titulo">
        <h2>Agrega un paciente</h2>
      </div>
      {/* Formulario para agregar o actualizar pacientes */}
      <div className="container-form">
        <Form className="form" onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Campo para Nombre y Apellido */}
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

            {/* Campo para Edad */}
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

          {/* Campo para Email */}
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              name="email"
              type="email"
              placeholder="ejemplo@ejemplo.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          {/* Campo para DNI */}
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

          </Row>

          {/* Botones para Agregar o Actualizar */}
          <Row>

            <div className="text-center mt-5">
              {mostrar2 && <Button variant="primary" type="submit">
                Agregar
              </Button>}

              {mostrar && (
                <Button
                  variant="warning"
                  type="button"
                  onClick={handleActualizar}
                >
                  Actualizar
                </Button>
              )}
            </div>
          </Row>
        </Form>
      </div>
      {/* Barra lateral */}
      <Sidebar />
      {/* Tabla para mostrar pacientes */}
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
                    {/* Botón para eliminar */}
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
                    {/* Botón para editar */}
                    <button
                      className="editBtn"
                      onClick={() => handleEditar(paciente.id_paciente)}
                    >
                      <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <Link className="link" to={`/pacientes/${paciente.id_paciente}`}>
                    <button className="btn-ver">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Modal de confirmación para eliminar */}
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

//exportacion del componente
export default Main;
