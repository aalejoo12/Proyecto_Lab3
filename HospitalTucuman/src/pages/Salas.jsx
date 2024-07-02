import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Salas = () => {
  const [salas, setSalas] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);
  const [tipoSala, setTipoSala] = useState(null);
  const [show, setShow] = useState(false);
  const [idAeliminar, setIdAEliminar] = useState(null);
  const [idActualizar, setIdActualizar] = useState(null);



  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };

  const handleClose = () => {
    setShow(false);
  };

  const getSalas = async () => {
    let result = await axios.get("http://localhost:8000/salas");
    console.log(result.data);
    setSalas(result.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoSala != null) {
      const response = axios.post("http://localhost:8000/salas/agregar", {
        tipoSala,
      });
      if (response) {
        alert("Sala creada");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
setTipoSala("")
    getSalas();
  };

  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true);

    let response = await axios.delete(
      `http://localhost:8000/salas/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Sala eliminada correctamente");
    }
    getSalas();
  };


  const handleEditar = async (id) => {
    setMostrar(true)
    setMostrar2(false)
    setIdActualizar(id)

    let result = await axios.get(`http://localhost:8000/salas/${id}`);
    const sala = result.data;
    console.log(sala[0].tipoSala);

    if (result) {

     setTipoSala(sala[0].tipoSala)
    
    }
  };

  const handleActualizar = async (e) => {

    getSalas();

    setMostrar(false)
    setMostrar2(true)
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8000/salas/editar/${idActualizar}`, {
        tipoSala:tipoSala
      });
      if (response.status === 200) {
        alert("Sala actualizada correctamente");
        getSalas();
      }
    } catch (error) {
      console.error("Error al actualizar la sala:", error);
    }

  setTipoSala("")
    getSalas()

  }

  useEffect(() => {
    getSalas();
  }, []);

  return (
    <>
      <Header />
      <div className="container-form">
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <FormLabel>
                <h2>Ingrese la nueva sala</h2>{" "}
              </FormLabel>
              <FormControl
              value={tipoSala}
                onChange={(e) => {
                  setTipoSala(e.target.value);
                }}
              />
            </FormGroup>
          </Row>
          {mostrar2 && (
            <Button variant="primary" type="submit">
              Agregar
            </Button>
          )}

          {mostrar && (
            <Button variant="warning" type="button" onClick={handleActualizar}>
              Actualizar
            </Button>
          )}
        </Form>
      </div>

      <Container fluid className="tabla">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID Sala</th>
              <th>Tipo de Sala</th>
              <th>Cantidad de camas</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {salas.map((sala) => (
              <tr key={sala.id_sala}>
                <td>{sala.id_sala}</td>
                <td>{sala.tipoSala}</td>
                <td>{sala.cantidadCamas}</td>

                <td>
                  <div className="d-flex justify-content-center gap-3 ">
                    <button
                      className="bin-button"
                      onClick={() => handleShow(sala.id_sala)}
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
                    <button className="editBtn" onClick={() => handleEditar(sala.id_sala)}>
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
            ¿Estás seguro que quieres eliminar la sala?
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

export default Salas;
