import React from "react";
import "../css/cards.css"; // Importa el archivo CSS para estilos de las tarjetas
import { Col } from "react-bootstrap"; // Importa el componente Col de react-bootstrap para el diseño de columnas

// Componente funcional Cards que recibe las propiedades: nombre, apellido, dni, legajo e img
const Cards = ({ nombre, apellido, dni, legajo, img }) => {
  return (
    <>
      {/* Define una columna que ocupa 4 unidades en pantallas medianas */}
      <Col md={4}>
        {/* Contenedor de la tarjeta con clases para el diseño y el margen */}
        <div className="card-integrantes mt-5  m-5">
          {/* Contenedor de la imagen de la tarjeta */}
          <div className="card-image">
            {/* Imagen de la tarjeta con src, alt, ancho y alto */}
            <img
              className="card-image"
              src={img}
              alt=""
              width={290}
              height={290}
            />
          </div>
          {/* Título de la tarjeta que muestra el nombre y apellido */}
          <p className="card-title">
            {nombre} {apellido}
          </p>
          {/* Cuerpo de la tarjeta que muestra el DNI y el legajo */}
          <p className="card-body">
            Dni: {dni}
            <br />
            Legajo: {legajo}
          </p>
        </div>
      </Col>
    </>
  );
};
// Exporta el componente Cards para que pueda ser usado en otros archivos
export default Cards;
