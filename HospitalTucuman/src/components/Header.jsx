//importa React, css, y componentes de react-bootstrap
import React from "react";
import "../css/Header.css";
import { Navbar, Container, NavbarText, Nav, Image } from "react-bootstrap";

//define el componente header
const Header = () => {
  //este componente muestra
  return (
    //un navbar con una clase que hace que se mueva a la derecha
    <Navbar className="navbar">
      {/* un contenedor de ancho completo que usa flexbox y que esta centrado */}
      <Container fluid className="d-flex justify-content-center">
        <Navbar.Brand className="justify-content-end" href="#home">
          {/* una imagen */}
          <img
            alt=""
            src="../public/signo-de-hospital.ico"
            width="45"
            height="45"
            className="d-inline-block align-top"
          />{" "}
          {/* Un titulo que tiene css que le cambia el grosor y el tamaño de la letra */}
          <NavbarText className="titulo">Hospital Tucumán</NavbarText>
        </Navbar.Brand>
      </Container>
      {/* un div que esta al extremo derecho */}
      <div className="justify-content-end me-5">
        <Nav>
          {/* una imagen */}
          <Image
            src="../public/images.jpeg" // Cambia esto a la ruta de tu imagen
            roundedCircle
            width="40"
            height="40"
            className="circular-frame"
          />
        </Nav>
      </div>
    </Navbar>
  );
};

//exporta el componente header
export default Header;
