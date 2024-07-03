import "./App.css"; // Importa el archivo de estilos CSS
import Home from "./pages/Home"; // Importa el componente Home
import Login from "./pages/Login"; //Importa el componente Login
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importa componentes para el enrutamiento de la aplicación
import Pacientes from "./pages/Pacientes"; // Importa el componente Pacientes
import Medicos from "./pages/Medicos"; // Importa el componente Medicos
import Turnos from "./pages/Turnos"; // Importa el componente Turnos
import Historial from "./pages/Historial"; // Importa el componente Historial
import Estudios from "./pages/Estudios"; // Importa el componente Estudios
import Camas from "./pages/Camas"; // Importa el componente Camas
import VerCama from "./pages/VerCama"; // Importa el componente VerCama
import Error from "./pages/Error"; // Importa el componente Error
import Salas from "./pages/Salas"; // Importa el componente Salas
import VerPaciente from "./pages/VerPaciente"; // Importa el componente VerPaciente

function App() {
  return (
    <>
      {/* Contenedor principal con la clase 'container-fluid' */}
      <div className="container-fluid">
        {/* Envoltorio para la gestión de rutas usando BrowserRouter */}
        <BrowserRouter>
          {/* Definición de las rutas de la aplicación */}
          <Routes>
            {/* Ruta para la página de inicio de sesión */}
            <Route path="/" element={<Login />} />
            {/* Ruta para la página principal */}
            <Route path="/home" element={<Home />} />
            {/* Ruta para la página de pacientes */}
            <Route path="/pacientes" element={<Pacientes />} />
            {/* Ruta para la página de médicos */}
            <Route path="/medicos" element={<Medicos />} />
            {/* Ruta para la página de turnos */}
            <Route path="/turnos" element={<Turnos />} />
            {/* Ruta para la página de historial clínico */}
            <Route path="/hc" element={<Historial />} />
            {/* Ruta para la página de estudios */}
            <Route path="/estudios" element={<Estudios />} />
            {/* Ruta para la página de camas */}
            <Route path="/camas" element={<Camas />} />
            {/* Ruta para ver una cama específica, identificada por su ID */}
            <Route path="/camas/:id" element={<VerCama />} />
            {/* Ruta para ver un paciente específico, identificado por su ID */}
            <Route path="/pacientes/:id" element={<VerPaciente />} />
            {/* Ruta para la página de salas */}
            <Route path="/salas" element={<Salas />} />
            {/* Ruta de error para páginas no encontradas */}
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App; // Exporta el componente App
