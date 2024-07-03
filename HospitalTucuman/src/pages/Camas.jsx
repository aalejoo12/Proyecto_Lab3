import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import Header from "../components/Header"; // Importa el componente Header
import Sidebar from "../components/Sidebar"; // Importa el componente Sidebar
import Footer from "../components/Footer"; // Importa el componente Footer
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import {
  Button,
  Card,
  CardFooter,
  CardImg,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap"; // Importa componentes de react-bootstrap
import { Link } from "react-router-dom"; // Importa Link de react-router-dom para navegación
import "../css/Camas.css"; // Importa los estilos CSS específicos para este componente

const Camas = () => {
  // Declaración de estados usando useState
  const [camas, setCamas] = useState([]); // Estado para almacenar las camas
  const [mostrar, setMostrar] = useState(false); // Estado para mostrar/ocultar el formulario de actualización
  const [mostrar2, setMostrar2] = useState(true); // Estado para mostrar/ocultar el formulario de creación

  const [estado, setEstado] = useState(0); // Estado para el estado de la cama
  const [fechaIngreso, setFechaIngreso] = useState(""); // Estado para la fecha de ingreso
  const [fechaAlta, setFechaAlta] = useState(""); // Estado para la fecha de alta
  const [id_paciente, setId_paciente] = useState(null); // Estado para el ID del paciente
  const [id_sala, setId_sala] = useState(""); // Estado para el ID de la sala

  const [idActualizar, setIdActualizar] = useState(null); // Estado para el ID de la cama a actualizar
  const [idAeliminar, setIdAEliminar] = useState(null); // Estado para el ID de la cama a eliminar

  const [pacientes, setPacientes] = useState([]); // Estado para almacenar los pacientes
  const [salas, setSalas] = useState([]); // Estado para almacenar las salas

  const [show, setShow] = useState(false); // Estado para mostrar/ocultar el modal

  const [opcion, setOpcion] = useState(null); // Estado para la opción seleccionada en el formulario

  // Función para manejar el cambio de la opción seleccionada
  const handleChange = () => {
    if (opcion === "NO") {
      setEstado(1);
    } else if (opcion === "SI") {
      setEstado(0);
    } else {
      setEstado(null);
    }
  };

  // Función para obtener las camas desde el backend
  const getCamas = async () => {
    let result = await axios.get("http://localhost:8000/camas");
    setCamas(result.data);
  };

  // Función para obtener los pacientes desde el backend
  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    setPacientes(result.data);
  };

  // Función para obtener las salas desde el backend
  const getSalas = async () => {
    let result = await axios.get("http://localhost:8000/salas");
    setSalas(result.data);
  };

  // Función para formatear una fecha en un string legible
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  // Función para manejar el envío del formulario de creación de camas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id_sala != "") {
      const response = axios.post("http://localhost:8000/camas/agregar", {
        estado: 0,
        fechaIngreso: "1111-11-11",
        fechaAlta: "1111-11-11",
        id_paciente: null,
        id_sala: id_sala,
      });
      if (response) {
        alert("cama creada");
      }
    } else {
      alert("debe ingresar todos los campos");
    }
    setFechaIngreso("");
    setFechaAlta("");
    setId_paciente("");

    getCamas();
  };

  // Función para manejar la actualización de una cama
  const handleActualizar = async (e) => {
    getCamas();
    console.log(id_sala);
    setMostrar(false);
    setMostrar2(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/camas/editar/${idActualizar}`,
        {
          estado: estado,
          fechaIngreso: fechaIngreso,
          fechaAlta: fechaAlta,
          id_paciente: id_paciente,
          id_sala: id_sala,
        }
      );
      if (response.status === 200) {
        alert("Cama actualizado correctamente");
        getCamas();
      }
    } catch (error) {
      console.error("Error al actualizar la cama:", error);
    }

    setFechaIngreso("");
    setFechaAlta("");
    setId_paciente("");
    setEstado("");

    getCamas();
  };

  // Función para manejar la edición de una cama
  const handleEditar = async (id) => {
    setEstado(1);
    setMostrar(true);
    setMostrar2(false);
    setIdActualizar(id);
    let result = await axios.get(`http://localhost:8000/camas/${id}`);
    const cama = result.data;

    if (result) {
      const fechaIngreso = new Date(cama[0].fechaIngreso);
      const fechaAlta = new Date(cama[0].fechaAlta);

      const fechaIngresoFormateada = fechaIngreso.toISOString().split("T")[0];
      const fechaAltaFormateada = fechaAlta.toISOString().split("T")[0];

      setFechaIngreso(fechaIngresoFormateada);
      setFechaAlta(fechaAltaFormateada);

      setId_paciente(cama[0].id_paciente);
      setId_sala(cama[0].id_sala);
      console.log(cama[0].fechaIngreso);
    }
  };

  // Función para manejar la eliminación de una cama
  const handleEliminar = async () => {
    console.log(idAeliminar);
    handleClose(true);

    let response = await axios.delete(
      `http://localhost:8000/camas/eliminar/${idAeliminar}`
    );

    if (response) {
      alert("Cama eliminada correctamente");
    }
    getCamas();
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShow(false);
  };

  // Función para mostrar el modal
  const handleShow = (id) => {
    setShow(true);
    setIdAEliminar(id);
  };

  // useEffect para obtener las camas, pacientes y salas cuando el componente se monta
  useEffect(() => {
    getCamas();
    getPacientes();
    getSalas();
  }, []);

  return (
    <>
      {/* Renderiza el componente de encabezado */}
      <Header />
      {/* Título centralizado de la página */}
      <div className="container-titulo text-center mt-5">
        <h2>Gestión de camas</h2>
      </div>

      {/* Formulario para crear o actualizar camas */}
      <div className="container-form">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Título del formulario basado en el estado */}
            {estado != 1 ? (
              <h3>Crear una cama</h3>
            ) : (
              <h3>Internar un paciente</h3>
            )}

            {/* Selección de sala */}
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Seleccione la sala</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setId_sala(e.target.value);
                }}
                defaultValue=""
              >
                <option value="">Elije la sala</option>
                {salas.map((sala) => (
                  <option value={sala.id_sala} key={sala.id_sala}>
                    {sala.tipoSala}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Selección de paciente si el estado no es 0 */}
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className={estado != 0 ? "visible" : "hidden"}
            >
              <Form.Label>Ingrese el paciente</Form.Label>
              <Form.Select
                onChange={(e) => setId_paciente(e.target.value)}
                defaultValue=""
              >
                <option value="">Elije el paciente</option>
                {pacientes.map((paciente) => (
                  <option
                    value={paciente.id_paciente}
                    key={paciente.id_paciente}
                  >
                    {paciente.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Campos de fechas de ingreso y alta si el estado no es 0 */}
          <Row>
            <Form.Group
              as={Col}
              className={estado != 0 ? "visible" : "hidden"}
              controlId="formGridAddress1"
            >
              <Form.Label>Ingrese la fecha de ingreso</Form.Label>
              <Form.Control
                value={fechaIngreso}
                type="date"
                placeholder="Fecha de ingreso"
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className={estado != 0 ? "visible" : "hidden"}
              controlId="formGridAddress2"
            >
              <Form.Label>Ingrese la fecha de alta</Form.Label>
              <Form.Control
                value={fechaAlta}
                type="date"
                placeholder="Fecha de alta"
                onChange={(e) => {
                  setFechaAlta(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          {/* Botones de acción para crear o actualizar camas */}
          {mostrar2 && (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Crear cama
            </Button>
          )}

          {mostrar && (
            <Button variant="warning" type="button" onClick={handleActualizar}>
              Actualizar
            </Button>
          )}
        </Form>
      </div>

      {/* AQUI EMPIEZAN LAS CARDS */}
      {/* Listado de camas en formato de tarjetas */}
      <div className="d-flex justify-content-center">
        <Row md={2}>
          {camas.map((cama) => (
            <Col className="card-medicos" md={6} key={cama.id_cama}>
              <Card
                style={{ width: "410px", height: "590px" }}
                className={cama.estado !== 0 ? "blocked" : ""}
              >
                <Card.Title className="fw-bolder fs-4 card-title">
                  ID: #{cama.id_cama}
                </Card.Title>
                <CardImg
                  style={{ width: "408px", height: "320px" }}
                  src="https://i.trade-cloud.com.cn/upload/6662/image/20211224/2_295201.jpg"
                ></CardImg>
                <Card.Body className="card-body">
                  <p className="fs-5 fw-bold">
                    {" "}
                    Disponibilidad: {cama.estado === 0 ? "Libre" : "Ocupada"}
                  </p>
                  <p className={cama.estado != 0 ? "visible" : "hidden"}>
                    {" "}
                    Fecha Ingreso: {formatDate(cama.fechaIngreso)}
                  </p>
                  <p className={cama.estado != 0 ? "visible" : "hidden"}>
                    {" "}
                    Fecha Alta: {formatDate(cama.fechaAlta)}
                  </p>
                  <p> Sala: {cama.tipoSala}</p>
                </Card.Body>
                <CardFooter className="card-footer">
                  <Button
                    className={cama.estado != 1 ? "visible" : "hidden"}
                    variant="success"
                    onClick={() => handleEditar(cama.id_cama)}
                  >
                    Internar
                  </Button>
                  <Button
                    className={cama.estado != 0 ? "visible" : "hidden"}
                    variant="success"
                    onClick={() => handleEditar(cama.id_cama)}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleShow(cama.id_cama)}
                    className="btn2"
                    variant="danger"
                  >
                    Eliminar
                  </Button>
                  <Link className="link" to={`/camas/${cama.id_cama}`}>
                    <Button
                      className={cama.estado != 0 ? "visible" : "hidden"}
                      variant="primary"
                    >
                      Ver
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* ESTE ES EL MODAL PARA PREGUNTAR SI QUIERE ELIMINAR O NO */}
      {/* Modal para confirmar eliminación */}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>¡Cuidado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que quieres eliminar la cama?</Modal.Body>
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

      {/* Renderiza el componente de la barra lateral */}
      <Sidebar />
      {/* Renderiza el componente de pie de página */}
      <Footer />
    </>
  );
};

//Exporta el componente pages camas
export default Camas;
