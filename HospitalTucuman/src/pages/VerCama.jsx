import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Button, Card, CardFooter, CardImg, Col, Row } from "react-bootstrap";




const VerCama = () => {

    const { id } = useParams();
    const [cama,setCama] = useState([])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      };
    const getCamas = async () => {
        let result = await axios.get(`http://localhost:8000/camas/${id}`);
        console.log(result.data);
        setCama(result.data);
      };


useEffect(() => {

  getCamas()

  
}, [])




  return (
    <>
    <Header/>

    <div className="d-flex justify-content-center">
        <Row >
          {cama.map((cama) => (
            <Col className="card-medicos" key={cama.id_cama}>
              <Card style={{ width: "410px", height: "650px" }}>
                <Card.Title className="fw-bolder fs-4 card-title bg-light">Cama número: {cama.id_cama}</Card.Title>
                <CardImg style={{ width: "408px", height: "320px" }} src="https://i.trade-cloud.com.cn/upload/6662/image/20211224/2_295201.jpg"></CardImg>
                <Card.Body className="card-body">
                  <p className="fs-5 fw-bold"> Disponibilidad: {cama.estado === 1 ? "Libre" : "Ocupada"}</p>
                  <p>Por el/la paciente: {cama.nombre}</p>
                  <p>Fecha de Ingreso: {formatDate(cama.fechaIngreso)}</p>
                  <p>Fecha de Alta: {formatDate(cama.fechaAlta)}</p>
                  <p> Sala: {cama.tipoSala}</p>
                </Card.Body>
             <CardFooter>
             <Link className="link" to={`/camas`}>
                  <Button className="btn3" variant="primary">Voler</Button>
                  </Link>
             </CardFooter>
                
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    
    <Sidebar/>
    <Footer/>
    
    </>
  )
}

export default VerCama