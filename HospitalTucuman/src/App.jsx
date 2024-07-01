import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";
import Turnos from "./pages/Turnos";
import Historial from "./pages/Historial";
import Estudios from "./pages/Estudios";
import Camas from "./pages/Camas";
import VerCama from "./pages/VerCama";



function App() {
  return (
    <>
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/hc" element={<Historial />} />
          <Route path="/estudios" element={<Estudios />} />
          <Route path="/camas" element={<Camas />} />
          <Route path="/camas/:id" element={<VerCama />} />

        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
