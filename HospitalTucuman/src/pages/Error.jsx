// Importa los componentes Header, Footer y MainError desde la carpeta components
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainError from "../components/MainError";

// Define un componente funcional llamado Error
const Error = () => {
  return (
    <>
      {/* Renderiza el componente Header */}
      <Header />
      {/* Renderiza el componente MainError */}
      <MainError />
      {/* Renderiza el componente Footer */}
      <Footer />
    </>
  );
};

// Exporta el componente Error para que pueda ser utilizado en otros archivos
export default Error;
