import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pacientes from "./pages/Pacientes";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />} />

        </Routes>
      </BrowserRouter>
    </>
  );
} 

export default App;
