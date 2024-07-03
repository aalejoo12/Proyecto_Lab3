// Importa las librerías necesarias de React y otros módulos.
import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import Error from "../assets/error.png";
import "../css/Error.css";
import { Link } from "react-router-dom";

// Define el componente funcional MainError.
const MainError = () => {
  return (
    <>
      {/* Contenedor principal */}
      <div className="container">
        {/* Imagen de error */}
        <Image className="img" src={Error}></Image>

        {/* Mensaje de error */}
        <h5>Pagina no encontrada</h5>

        {/* Enlace para volver a la página principal */}
        <p style={{ marginLeft: "25px", marginTop: "10px" }}>
          <Link to={"/home"}>Volver a la pagina principal</Link>
        </p>
      </div>
    </>
  );
};

// Exporta el componente MainError para que pueda ser usado en otras partes de la aplicación.
export default MainError;
