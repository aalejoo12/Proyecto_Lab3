import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "../css/Home.css";
import { Typewriter } from "react-simple-typewriter";
import Hospital from "../assets/hospital.png";
import Habitacion from "../assets/habitacion.png";
import Medicos from "../assets/medicos.png";
import Medicine from "../assets/medicine.jpg";
const MainHome = () => {
  return (
    <>
    <div className="container-fluid">
      <Row>
        <Col className="izq letra">
          <div style={{ marginTop: "5px" }}>
            Ingresa en pacientes para añadir, actualizar o borrar la informacion
            de algun paciente
          </div>
          <div style={{ marginTop: "10px" }}>
            Ingresa en medicos para ver información de nuestros medicos
          </div>
          <div style={{ marginTop: "20px" }}>
            Ingresa en turnos para ver información sobre los turnos
          </div>
          <div style={{ marginTop: "40px" }}>
            Ingresa en historial para ver el historial
          </div>
          <div style={{ marginTop: "30px" }}>
            Ingresa en estudios para ver la información de los estudios
          </div>
          <div style={{ marginTop: "20px" }}>
            Ingresa en camas para ver la disponibilidad de las camas de nuestro
            establecimiento
          </div>
        </Col>
        <Col></Col>
        <Col>
          <h2 className="bienvenida" style={{ marginTop: "25px" }}>
            Bienvenida/o al trabajo
          </h2>
          <p className="parrafo" style={{ marginTop: "30px" }}>
            Te deseamos un buen dia. Estamos seguros de que tu talento,
            dedicación y profesionalismo serán de gran ayuda para nosotros y
            nuestros pacientes
          </p>
          <Row>
            <Col>
              <p className="typeWriter">
                <Typewriter
                  words={["Pasion", "Dedicación", "Esfuerzo", "Exito", "Salud"]}
                  loop={3}
                  typeSpeed={35}
                  deleteSpeed={5}
                  delaySpeed={1000}
                />
              </p>
            </Col>
            <Col>
              <img className="foto" src={Medicine} alt="" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Image className="img" src={Hospital}></Image>
        </Col>
        <Col>
          <Image className="img" src={Habitacion}></Image>
        </Col>
        <Col>
          <Image className="img" src={Medicos}></Image>
        </Col>
      </Row>
      </div>
    </>
  );
};

export default MainHome;
