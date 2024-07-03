import Main from "../components/Main"; // Importa el componente Main desde la carpeta components
import Header from "../components/Header"; // Importa el componente Header desde la carpeta components
import Footer from "../components/Footer"; // Importa el componente Footer desde la carpeta components

// Define un componente funcional llamado Pacientes
const Pacientes = () => {
  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />
      {/* Renderiza el componente Main */}
      <Main />
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};
// Exporta el componente Pacientes para que pueda ser utilizado en otros archivos
export default Pacientes;
