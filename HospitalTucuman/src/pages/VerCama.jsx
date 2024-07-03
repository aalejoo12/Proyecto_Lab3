import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { useEffect, useState } from "react"; // Importa hooks de React
import { Link, useParams } from "react-router-dom"; // Importa componentes de react-router-dom
// Importa componentes personalizados
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, Card, CardFooter, CardImg, Col, Row } from "react-bootstrap"; // Importa componentes de react-bootstrap

// Define el componente VerCama
const VerCama = () => {
  // Obtiene el parámetro id de la URL
  const { id } = useParams();
  // Define el estado para almacenar la información de la cama
  const [cama, setCama] = useState([]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  // Función para obtener la información de la cama desde el servidor
  const getCamas = async () => {
    let result = await axios.get(`http://localhost:8000/camas/${id}`);
    console.log(result.data);
    setCama(result.data);
  };

  // useEffect para ejecutar getCamas cuando el componente se monta
  useEffect(() => {
    getCamas();
  }, []);

  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />

      {/* Contenedor para las tarjetas de información de la cama */}
      <div className="d-flex justify-content-center">
        <Row>
          {/* Mapea el estado de cama para crear una tarjeta por cada cama */}
          {cama.map((cama) => (
            <Col className="card-medicos" key={cama.id_cama}>
              <Card style={{ width: "410px", height: "650px" }}>
                <Card.Title className="fw-bolder fs-4 card-title bg-light">
                  Cama número: {cama.id_cama}
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
                  <p>Por el/la paciente: {cama.nombre}</p>
                  <p>Fecha de Ingreso: {formatDate(cama.fechaIngreso)}</p>
                  <p>Fecha de Alta: {formatDate(cama.fechaAlta)}</p>
                  <p> Sala: {cama.tipoSala}</p>
                </Card.Body>
                <CardFooter>
                  <Link className="link" to={`/camas`}>
                    <Button className="btn3" variant="primary">
                      Voler
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {/* Renderiza el componente Sidebar */}
      <Sidebar />
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};
// Exporta el componente verCama para que pueda ser utilizado en otros archivos
export default VerCama;
