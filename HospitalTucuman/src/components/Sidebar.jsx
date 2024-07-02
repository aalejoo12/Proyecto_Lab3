//Importaciones
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import "../css/Sidebar.css";

//Define el ancho del Drawer (barra lateral) en píxeles
const drawerWidth = 200;

//define el componente
const Sidebar = () => {
  //el componente muestra..
  return (
    <>
      {/* Contenedor principal con estilo flexbox */}
      <Box sx={{ display: "flex" }}>
        {/* Componente para normalizar el CSS global */}
        <CssBaseline />

        {/* Crea una barra lateral permanente anclada a la izquierda */}
        <Drawer
          // Aplica estilos personalizados al Drawer y su papel interno (.MuiDrawer-paper)
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Contenedor con clase personalizada tulbar */}
          <Toolbar className="tulbar">
            {/* Enlace a la ruta /home */}
            <Link className="link" to={"/home"}>
              {/* Botón de React Bootstrap sin variante */}
              <Button variant="none">
                {/* Texto del botón con icono de casa */}
                <Typography
                  className="texto-tulbar"
                  variant=""
                  noWrap
                  component="div"
                >
                  🏠 Home
                </Typography>
              </Button>
            </Link>
          </Toolbar>

          {/* Líneas divisorias entre secciones */}
          <Divider />
          {/* Contenedor de elementos de lista con clase full-height */}
          <List className="full-height">
            {/* Elemento de lista con enlace a Pacientes */}
            <ListItem>
              <Link className="link" to={"/pacientes"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  👨🏻 Pacientes
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Líneas divisorias entre secciones */}
            <Divider />
            {/* Elemento de lista con enlace a Medicos */}
            <ListItem>
              <Link className="link" to={"/medicos"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  👨🏻‍⚕️ Medicos
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Líneas divisorias entre secciones */}
            <Divider />
            {/* Elemento de lista con enlace a Turnos */}
            <ListItem>
              <Link className="link" to={"/turnos"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  ✍🏻 Turnos
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Líneas divisorias entre secciones */}
            <Divider />
            {/* Elemento de lista con enlace a Historial */}
            <ListItem>
              <Link className="link" to={"/hc"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  🕑 Historial
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Líneas divisorias entre secciones */}
            <Divider />
            {/* Elemento de lista con enlace a Estudios */}
            <ListItem>
              <Link className="link" to={"/estudios"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  📕 Estudios
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            <Divider />
            <ListItem>
              <Link className='link' to={"/salas"}>
              <ListItemButton className="item-button">🏥 Salas</ListItemButton>
              </Link>
            <Divider />
            </ListItem>
            <Divider />
            {/* Elemento de la lista con enlace a Camas */}
            <ListItem>
              <Link className="link" to={"/camas"}>
                {/* Botón de lista con íconos y texto. */}
                <ListItemButton className="item-button">
                  🛏️ Camas
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem className="list-item-auto-margin">
              <Link className='link' to={"/nosotros"}>
              <ListItemButton className="item-button">
                🤝 Nosotros
              </ListItemButton>
              </Link>
            </ListItem>
          </List>
          {/* Líneas divisorias entre secciones */}
          <Divider />
        </Drawer>
        {/* Contenedor principal para el contenido principal de la aplicación. Utiliza flexbox para ocupar el espacio restante (flexGrow: 1). */}
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}></Box>
      </Box>
    </>
  );
};

//exporta el componente
export default Sidebar;
