import React from 'react'
import "../css/Header.css"
import { Navbar,Container } from 'react-bootstrap'



const Header = () => {


  return (
    <div>
    <Navbar className="bg-body-tertiary navbar">
    <Container fluid>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="../public/signo-de-hospital.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Hospital Tucumán
      </Navbar.Brand>
    </Container>
  </Navbar>
  </div>
  )
}

export default Header