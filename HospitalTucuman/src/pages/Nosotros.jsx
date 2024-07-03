import "../css/Nosotros.css";
import fotosofi from  "../../public/Sofia.jpeg"
import fotofacu from  "../../public/Facu.jpeg"
import fotobruno from  "../../public/Bruno.jpeg"
import fotonico from  "../../public/Nico.jpeg"
import fotorei from  "../../public/Reinoso.jpeg"
import fotoalejo from  "../../public/Alejo.jpeg"
import {Button, Row} from "react-bootstrap"
import { Link } from "react-router-dom";
const Nosotros = () => {
  return (

    <>
    <Row className="back">
      <Link className="link" to={`/home`}>
                      <Button className="btn3" variant="primary">
                        Voler
                      </Button>
                    </Link>
        <h1 className="titulocards d-flex justify-content-center">Integrantes </h1>
        <br />
      <div className="cardfacu mt-5  m-5" >
        <img className="card-imagefacu" src={fotosofi} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Acuña Ana Sofia </p>
        <p className="card-bodyfacu">
          <br />
          Dni: 41.495.227
          <br />
          Legajo: 58764
        </p>
      </div>

      <div className="cardfacu mt-5  m-5">
      <img className="card-imagefacu" src={fotoalejo} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Albornoz Silva Alejo</p>
        <p className="card-bodyfacu">
          <br />
          Dni: 43.290.034
          <br />
          Legajo: 58829
        </p>
      </div>

      <div className="cardfacu mt-5  m-5">
      <img className="card-imagefacu" src={fotonico} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Alvarez Nicolas Nahuel</p>
        <p className="card-bodyfacu">
          <br />
          Dni: 39.572.901
          <br />
          Legajo: 58828
        </p>
      </div>

      <div className="cardfacu mt-5  m-5">
      <img className="card-imagefacu" src={fotofacu} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Aragañaraz Facundo Nahuel</p>
        <p className="card-bodyfacu">
          <br />
          Dni: 39.573.876
          <br />
          Legajo: 59176
        </p>
      </div>

      <div className="cardfacu mt-5  m-5">
      <img className="card-imagefacu" src={fotobruno} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Bazan Bruno Gabriel</p>
        <p className="card-bodyfacu">
          <br />
          Dni: 45.060.701
          <br />
          Legajo: 59078
        </p>
      </div>

      <div className="cardfacu mt-5  m-5">
      <img className="card-imagefacu" src={fotorei} alt="" width={290} height={290}/>
        <p className="card-titlefacu">Reinoso Lucas Facundo</p>
        <p className="card-bodyfacu">
          <br />
          Dni: 41.059.989
          <br />
          Legajo: 59555
        </p>
      </div>
    </Row>
    </>
  );
};

export default Nosotros;
