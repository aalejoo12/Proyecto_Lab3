import React from 'react'
import "../css/cards.css"
import { Col } from 'react-bootstrap'

const Cards = ({nombre,apellido,dni,legajo,img}) => {
  return (
    <>
    <Col md={4}>
      <div className="card-integrantes mt-5  m-5" >
        <div className="card-image"> <img className="card-image" src={img} alt="" width={290} height={290}  /></div>
        <p className="card-title">{nombre} {apellido}</p>
        <p className="card-body">
          Dni: {dni} 
          <br />
          Legajo: {legajo}
        </p>
        
      </div>
    </Col>
    </>
  )
}

export default Cards