//importa css y  navbar
import "../css/Footer.css";
import { Navbar } from "react-bootstrap";
//define el componente footer
const Footer = () => {
  //este componente muestra...
  return (
    //un navbar centrado, que seria el footer
    <Navbar className="justify-content-center">
      {/* un div que esta centrado y tiene la clase footer que en el css cambia el color de la letra y de fondo */}
      <div className="footer text-center">
        {/* un titulo con otro tipo de letra */}
        <h4>
          <i aria-hidden="true">Copyright© 2024 Grupo 2 Comisión 2 </i>
        </h4>
      </div>
    </Navbar>
  );
};
//exporta el componente footer
export default Footer;
