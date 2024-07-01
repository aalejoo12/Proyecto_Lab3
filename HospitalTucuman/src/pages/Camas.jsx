import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import axios from "axios";
import { Button, Card, CardFooter, CardImg, Col, Row } from "react-bootstrap";

const Camas = () => {

const [camas,setCamas] = useState([])



    const getCamas = async () => {
        let result = await axios.get("http://localhost:8000/camas");
        console.log(result.data);
        setCamas(result.data);
      };

useEffect(() => {
  getCamas()

}, [])



  return (
    <>
      <Header />

<div className="d-flex justify-content-center">
        <Row md={2}>
          {camas.map((cama) => (
            <Col className="card-medicos" md={6} key={cama.id_cama}>
              <Card  style={{ width: "410px", height:"500px"}}>
                  <Card.Title  className="fw-bolder fs-4 card-title bg-light">Cama número: {cama.id_cama}</Card.Title>
                <CardImg style={{width:"408px",height:"320px"}} src="https://i.trade-cloud.com.cn/upload/6662/image/20211224/2_295201.jpg"></CardImg>
                <Card.Body className="card-body">
                  <p className="fs-5 fw-bold"> Disponible: {cama.estado}</p> 
                   <p> Sala:  {cama.tipoSala}</p>
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


      <Sidebar />
      <Footer />
    </>
  );
};

export default Camas;
