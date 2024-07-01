import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import axios from "axios";
import { Button, Card, CardFooter, CardImg, Col, Form, Modal, Row } from "react-bootstrap";

const Camas = () => {

  const [camas, setCamas] = useState([])
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(true);

  const [estado, setEstado] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [id_paciente, setId_paciente] = useState("");
  const [id_sala, setId_sala] = useState("");

  const [idActualizar, setIdActualizar] = useState(null);
  const [idAeliminar, setIdAEliminar] = useState(null);

  const [pacientes, setPacientes] = useState([])
  const [salas, setSalas] = useState([])

  const [show, setShow] = useState(false);

  const [opcion, setOpcion] = useState("");




  const getCamas = async () => {
    let result = await axios.get("http://localhost:8000/camas");
    console.log(result.data);
    setCamas(result.data);
  };

  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    console.log(result.data);
    setPacientes(result.data);
  };

  const getSalas = async () => {
    let result = await axios.get("http://localhost:8000/salas");
    console.log(result.data);
    setSalas(result.data);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fechaIngreso && fechaAlta && id_paciente && id_sala != "" && estado != null) {
      handleChange();

      const response = axios.post("http://localhost:8000/camas/agregar", {
        estado: estado,
        fechaIngreso: fechaIngreso,
        fechaAlta: fechaAlta,
        id_paciente: id_paciente,
        id_sala: id_sala,
      });
      if (response) {
        alert("cama creada");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
    setEstado("");
    setFechaIngreso("");
    setFechaAlta("");
    setId_paciente("");
    setId_sala("");

    e.target.reset();
    getCamas();
  };
  const handleChange = () => {

    // parte de agregar

    if (opcion === "SI") {
      setEstado(1);
    } else if (opcion === "NO") {
      setEstado(0);
    } else {
      setEstado(null);
    }
  };
  const handleActualizar = async (e) => {

    getCamas();

    setMostrar(false)
    setMostrar2(true)
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8000/camas/editar/${idActualizar}`, {
        estado: estado,
        fechaIngreso: fechaIngreso,
        fechaAlta: fechaAlta,
        id_paciente: id_paciente,
        id_sala: id_sala,
      });
      if (response.status === 200) {
        alert("Cama actualizada correctamente");
        getCamas();
      }
    } catch (error) {
      console.error("Error al actualizar la cama:", error);
    }

    setFechaIngreso("");
    setFechaAlta("");
    setId_paciente("");
    setId_sala("");
    setEstado("");
    getCamas();

  }

  const handleEditar = async (id) => {
    setMostrar(true)
    setMostrar2(false)
    setIdActualizar(id)

    let result = await axios.get(`http://localhost:8000/camas/${id}`);
    const cama = result.data;
    console.log(cama[0]);

    if (result) {
      const fechaIngreso = new Date(cama[0].fechaIngreso);
      const fechaAlta = new Date(cama[0].fechaAlta);


      const fechaIngresoFormateada = fechaIngreso.toISOString().split('T')[0];
      const fechaAltaFormateada = fechaAlta.toISOString().split('T')[0];


      setFechaIngreso(fechaIngresoFormateada)
      setFechaAlta(fechaAltaFormateada)

      setId_paciente(cama[0].id_paciente)
      setId_sala(cama[0].id_sala)
      setEstado(cama.estado);

    }
  };

  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true)

    let response = await axios.delete(
      `http://localhost:8000/camas/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Cama eliminada correctamente");
    }
    getCamas();
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };

  useEffect(() => {
    getCamas()
    getPacientes()
    getSalas()

  }, [])



  return (
    <>
      <Header />
      <div className="container-titulo text-center mt-5">
        <h2>Agrega una nueva cama</h2>
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
              <Form.Label>Ingrese La sala</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setId_sala(e.target.value);
                }}
                defaultValue=""
              >
                <option value="">Elije La sala</option>
                {salas.map((sala) => (
                  <option value={sala.id_sala} key={sala.id_sala}>
                    {sala.tipoSala}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Ingrese la fecha de ingreso</Form.Label>
              <Form.Control value={fechaIngreso} type="date" placeholder="Fecha de ingreso" onChange={(e) => { setFechaIngreso(e.target.value) }} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
              <Form.Label>Ingrese la fecha de alta</Form.Label>
              <Form.Control value={fechaAlta} type="date" placeholder="Fecha de alta" onChange={(e) => {
                setFechaAlta(e.target.value)
              }} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Disponibilidad</Form.Label>
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
          {mostrar2 && <Button variant="primary" type="submit">
            Agregar
          </Button>}

          {mostrar && <Button variant="warning" type="button" onClick={handleActualizar}>
            Actualizar
          </Button>}
        </Form>
      </div>









      {/* AQUI EMPIEZAN LAS CARDS */}

      <div className="d-flex justify-content-center">
        <Row md={2}>
          {camas.map((cama) => (
            <Col className="card-medicos" md={6} key={cama.id_cama}>
              <Card style={{ width: "410px", height: "500px" }}>
                <Card.Title className="fw-bolder fs-4 card-title bg-light">Cama número: {cama.id_cama}</Card.Title>
                <CardImg style={{ width: "408px", height: "320px" }} src="https://i.trade-cloud.com.cn/upload/6662/image/20211224/2_295201.jpg"></CardImg>
                <Card.Body className="card-body">
                  <p className="fs-5 fw-bold"> Disponible: {cama.estado}</p>
                  <p>Fecha de Ingreso: {formatDate(cama.fechaIngreso)}</p>
                  <p>Fecha de Alta: {formatDate(cama.fechaAlta)}</p>
                  <p> Sala:  {cama.tipoSala}</p>
                </Card.Body>
                <CardFooter className="card-footer">
                  <Button
                    className="btn1"
                    variant="success"
                    onClick={() => handleEditar(cama.id_cama)}
                  >
                    Editar
                  </Button>
                  <Button onClick={() => handleShow(cama.id_cama)} className="btn2" variant="danger">Eliminar</Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>


      {/* ESTE ES EL MODAL PARA PREGUNTAR SI QUIERE ELIMINAR O NO */}

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>¡Cuidado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres eliminar la cama?
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

export default Camas;
