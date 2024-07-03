import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import Error from "../assets/error.png";
import "../css/Error.css";
import { Link } from "react-router-dom";
const MainError = () => {
  return (
    <>
      <div className="container">
        <Image className="img" src={Error}></Image>

        <h5>Pagina no encontrada</h5>

        <p style={{ marginLeft: "25px", marginTop: "10px" }}>
          <Link to={"/home"}>Volver a la pagina principal</Link>
        </p>
      </div>
    </>
  );
};

export default MainError;
