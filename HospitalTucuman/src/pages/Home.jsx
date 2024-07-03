import React from "react"; // Importa la biblioteca React

// Importa los componentes Header, Footer, Sidebar y MainHome desde la carpeta components
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Home.css"; // Importa el archivo de estilos CSS para la página de inicio
import Sidebar from "../components/Sidebar";
import MainHome from "../components/MainHome";

// Define un componente funcional llamado Home
const Home = () => {
  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />
      {/* Renderiza el componente Sidebar */}
      <Sidebar />
      {/* Renderiza el componente MainHome */}
      <MainHome />
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};
// Exporta el componente Home para que pueda ser utilizado en otros archivos
export default Home;
