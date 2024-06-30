import React from 'react'
import "../css/Header.css"
import { Navbar,Container, NavbarText, Nav, Image } from 'react-bootstrap'



const Header = () => {


  return (
    <Navbar className="navbar">
    <Container fluid className='d-flex justify-content-center'>
      <Navbar.Brand className='justify-content-end' href="#home">
        
        <img
          alt=""
          src="../public/signo-de-hospital.ico"
          width="45"
          height="45"
          className="d-inline-block align-top"
        />{' '}
        <NavbarText className='titulo' >Hospital Tucumán</NavbarText>
      </Navbar.Brand>
    </Container>
    <div className='justify-content-end me-5' >
    <Nav>
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
  )
}

export default Header