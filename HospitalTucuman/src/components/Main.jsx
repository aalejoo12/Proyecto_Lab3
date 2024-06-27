import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "../css/Main.css";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
const drawerWidth = 200;

const Main = () => {
  const [pacientes, setPacientes] = useState([]);

  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    console.log(result.data);
    setPacientes(result.data);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
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
          <Toolbar className="tulbar">
            <Typography variant="h6" noWrap component="div">
              Menú
            </Typography>
          </Toolbar>

          <Divider />

          <Divider />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
      <Container className="tabla" fluid>
       
  <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre y Apellido</th>
                <th>Edad</th>
                <th>Email</th>
                <th>DNI</th>
                <th>Teléfono</th>

              </tr>
            </thead>
            <tbody>
            {pacientes.map((paciente) => 
             
             <tr key={paciente.id_paciente}>
             <td>{paciente.id_paciente}</td>
             <td>{paciente.nombre}</td>
             <td>{paciente.edad}</td>
             <td>{paciente.email}</td>
             <td>{paciente.dni}</td>
             <td>{paciente.telefono}</td>

           </tr>
            )}
           
            </tbody>
          </Table>

         
      </Container>
    </>
  );
};

export default Main;
