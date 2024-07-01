import "../css/Medicos.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, Card, CardBody, CardFooter, CardText, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);

  const [nomyape, setNomyape] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState();

  const [idActualizar, setIdActualizar] = useState(null);
  const [idAeliminar, setIdAEliminar] = useState(null);

  const [show, setShow] = useState(false);


  const getMedicos = async () => {
    let result = await axios.get("http://localhost:8000/medicos");
    console.log(result.data);
    setMedicos(result.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomyape && especialidad && email && telefono && imagen != "") {
      handleChange();

      const response = axios.post("http://localhost:8000/medicos/agregar", {
        nombre: nomyape,
        especialidad: especialidad,
        email: email,
        telefono: telefono,
        imagen: imagen,
      });
      if (response) {
        alert("medico creado");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
    setNomyape("");
    setEspecialidad("");
    setEmail("");
    setTelefono("");
    setImagen("");

    e.target.reset();
    getMedicos();
  };
  const handleChange = () => {};

  const handleActualizar = async (e) => {
    getMedicos();

    setMostrar(false);
    setMostrar2(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/medicos/editar/${idActualizar}`,
        {
          nombre: nomyape,
          especialidad: especialidad,
          email: email,
          telefono: telefono,
          imagen: imagen,
        }
      );
      if (response.status === 200) {
        alert("Medico actualizado correctamente");
        getMedicos(); // Opcional: actualizar la lista después de la actualización
      }
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
    setNomyape("");
    setEspecialidad("");
    setEmail("");
    setTelefono("");
    setImagen("");

    getMedicos();
  };

  const handleEditar = async (id_medico) => {
    setMostrar(true);
    setMostrar2(false);
    setIdActualizar(id_medico);

    let result = await axios.get("http://localhost:8000/medicos");

    // Buscamos el médico correspondiente al id_medico proporcionado
    const medico = result.data.find(m => m.id_medico === id_medico);

    if (medico) {
      setNomyape(medico.nombre);
      setEspecialidad(medico.especialidad);
      setEmail(medico.email);
      setTelefono(medico.telefono);
      setImagen(medico.imagen);
    } else {
      console.error(`Medico con id ${id_medico} no encontrado`);
    }
  };

  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true)

    let response = await axios.delete(
      `http://localhost:8000/medicos/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Medico eliminado correctamente");
    }
    getMedicos();
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };



  useEffect(() => {
    getMedicos();
  }, []);

  return (
    <>
      <Header />
      <div className="container-titulo text-center mt-5">
        <h2>Agrega un medico</h2>
      </div>
      <div className="container-form">
        <Form className="form" onSubmit={handleSubmit}>
          <Row>
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

            <Form.Group as={Col} controlId="formGridEspecialidad">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setEspecialidad(e.target.value);
                }}
                defaultValue=""
              >
                <option value="">Elije una especialidad</option>
                {medicos.map((medico) => (
                  <option value={medico.especialidad} key={medico.id_medico}>
                    {medico.especialidad}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

          </Row>

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
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                value={imagen}
                name="imagen"
                type="text"
                placeholder="Ingrese URL de la imagen"
                onChange={(e) => {
                  setImagen(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Row>
            <div className="text-center mt-5">
              {mostrar2 && (
                <Button variant="primary" type="submit" onClick={handleChange}>
                  Agregar
                </Button>
              )}

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

      <div className="d-flex justify-content-center">
        <Row md={2}>
          {medicos.map((medico) => (
            <Col className="card-medicos" md={6} key={medico.id_medico}>
              <Card  style={{ width: "410px", height:"600px"}}>
                <Card.Img style={{width:"408px",height:"320px"}} variant="top" src={medico.imagen} />
                  <Card.Title className="fw-bolder fs-4 card-title ">{medico.nombre}</Card.Title>
                <Card.Body className="card-body">
                  <p className="fs-5 fw-bold"> Especialidad: {medico.especialidad}</p> 
                   <p> Email:  {medico.email}</p>
                    <p>Telefono: {medico.telefono}</p>
                </Card.Body>
                    <CardFooter className="card-footer">
                  <Button
                  className="btn1"
                    variant="success"
                    onClick={() => handleEditar(medico.id_medico)}
                  >
                    Editar
                  </Button>
                  <Button onClick={()=>handleShow(medico.id_medico)} className="btn2" variant="danger">Eliminar</Button>
                  </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>¡Cuidado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres eliminar el medico?
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



      <Sidebar />
      <Footer />
    </>
  );
};

export default Medicos;
