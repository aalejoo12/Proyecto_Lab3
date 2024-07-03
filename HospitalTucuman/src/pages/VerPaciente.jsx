// Importa hooks de React
import { useEffect, useState } from "react";
// Importa componentes personalizados
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
// Importa componentes de react-router-dom
import { Link, useParams } from "react-router-dom";
// Importa axios para realizar solicitudes HTTP
import axios from "axios";
// Importa componentes de react-bootstrap
import { Button, Container, Table } from "react-bootstrap";
// Importa estilos CSS personalizados
import "../css/Paciente.css";

// Define el componente VerPaciente
const VerPaciente = () => {
  // Obtiene el parámetro id de la URL

  const { id } = useParams();
  // Define el estado para almacenar la información del paciente
  const [paciente, setPaciente] = useState([]);

  // Función para obtener la información del paciente desde el servidor
  const getPaciente = async () => {
    let result = await axios.get(`http://localhost:8000/pacientes/${id}`);
    console.log(result.data);
    setPaciente(result.data);
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  // useEffect para ejecutar getPaciente cuando el componente se monta
  useEffect(() => {
    getPaciente();
  }, []);

  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />
      {/* Contenedor para la tabla de información del paciente */}
      <Container className="tabla-paciente tabla" fluid>
        {/* Tabla con la información del paciente */}
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID</th>
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
            {/* Mapea el estado de paciente para crear una fila por cada paciente */}
            {paciente.map((paciente) => (
              <tr key={paciente.id_paciente}>
                <td>{paciente.id_paciente}</td>
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
        <div className="text-center">
          {/* Enlace para volver a la lista de pacientes */}
          <Link className="link" to={`/pacientes`}>
            <Button className="btn3" variant="primary">
              Voler
            </Button>
          </Link>
        </div>
      </Container>
      {/* Renderiza el componente Sidebar */}
      <Sidebar />
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};

// Exporta el componente verPaciente para que pueda ser utilizado en otros archivos
export default VerPaciente;
