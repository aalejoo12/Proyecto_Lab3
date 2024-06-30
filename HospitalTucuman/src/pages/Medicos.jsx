import React from 'react'
import "../css/Medicos.css"
import Header from '../components/Header'
import Sidebar from "../components/Sidebar";
import Footer from '../components/Footer';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Medicos = () => {
  const [medicos, setMedicos] = useState([])

  const getMedicos = async () => {
    let result = await axios.get("http://localhost:8000/medicos");
    console.log(result.data);
    setMedicos(result.data);
  };


  useEffect(() => {

    getMedicos()

  }, [])


  return (
    <>

      <Header />
      <div className='d-flex justify-content-center'>
        <Row md={4} >
          {medicos.map((medico) =>
            <Col key={medico.id_medico}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={medico.imagen} />
                <Card.Body>
                  <Card.Title>{medico.nombre}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>

          )}
        </Row>

      </div>



      <Sidebar />
      <Footer />


    </>
  )
}

export default Medicos