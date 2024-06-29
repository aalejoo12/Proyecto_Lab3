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
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 200;

const Main = () => {
  const [pacientes, setPacientes] = useState([]);

  const [nomyape, setNomyape] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [internar, setInternar] = useState(0);
  const [opcion, setOpcion] = useState("");

  const getPacientes = async () => {
    let result = await axios.get("http://localhost:8000/pacientes");
    // console.log(result.data);
    setPacientes(result.data);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (nomyape && edad && email && dni && telefono != "" && internar != null) {
      handleChange()

      const response = axios.post("http://localhost:8000/pacientes",{
        nomyape:nomyape,
        edad:edad,
        email:email,
        dni:dni,
        telefono:telefono
  
      })
      if (response) {
        alert("contacto creado")
      }
    }
   else{
    alert("debe ingresar todos los campos")
   }
setNomyape("")
setEdad("")
setEmail("")
setDni("")
setTelefono("")
setInternar("")   

e.target.reset()
getPacientes();

  };

  const handleChange = () => {

    if (opcion === "SI") {
      setInternar(1);
    } else if (opcion ==="NO") {
      setInternar(0);
    }
    else{
      setInternar(null)
    }
  };

  useEffect(() => {
    getPacientes();
  }, []);

  // console.log({nomyape,edad,email,dni,telefono,internar});

  // console.log(opcion,internar);

  return (
    <>
      <div className="form">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Nombre y Apellido</Form.Label>
              <Form.Control
                name="nomyape"
                type="text"
                placeholder="Ingresa nombre y apellido"
                onChange={(e)=>{setNomyape(e.target.value)}}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                name="edad"
                type="number"
                placeholder="Edad"
                onChange={(e)=>{setEdad(e.target.value)}}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              name="dni"
              type="number"
              placeholder="Ingrese DNI sin puntos"
              onChange={(e)=>{setDni(e.target.value)}}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                name="telefono"
                type="number"
                placeholder="Teléfono"
                onChange={(e)=>{setTelefono(e.target.value)}}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Internación</Form.Label>
              <Form.Select
                onChange={(e)=>{setOpcion(e.target.value)}}
                defaultValue="Choose..."
              >
                <option value="">Elije</option>
                <option value={"SI"}>SI</option>
                <option value={"NO"}>NO</option>
              </Form.Select>

          </Form.Group>

 

          </Row>

          <div className="text-center mt-5">
            <Button variant="success" type="submit" onClick={handleChange}>
              Agregar
            </Button>
          </div>
        </Form>
      </div>

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
            <Button variant="none">
              <Typography
                className="texto-tulbar"
                variant=""
                noWrap
                component="div"
              >
                🏠 Home
              </Typography>
            </Button>
          </Toolbar>

          <Divider />
          <List className="full-height">
            <ListItem>
              <ListItemButton className="item-button">
                👨🏻 Pacientes
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton className="item-button">
                👨🏻‍⚕️ Medicos
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton className="item-button">✍🏻 Turnos</ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton className="item-button">
                🕑 Historial
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton className="item-button">
                📕 Estudios
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton className="item-button">🛏️ Camas</ListItemButton>
            </ListItem>
            <Divider />

            <ListItem className="list-item-auto-margin">
              <ListItemButton className="item-button">
                🤝 Nosotros
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 0 }}></Box>
      </Box>
      <Container className="tabla" fluid>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Nombre y Apellido</th>
              <th>Edad</th>
              <th>Email</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pacientes.map((paciente) => (
              <tr key={paciente.id_paciente}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.email}</td>
                <td>{paciente.dni}</td>
                <td>{paciente.telefono}</td>
                <td>
                  <div className="d-flex justify-content-center gap-3 ">
                    <button className="bin-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 39 7"
                        className="bin-top"
                      >
                        <line
                          strokeWidth="4"
                          stroke="white"
                          y2="5"
                          x2="39"
                          y1="5"
                        />
                        <line
                          strokeWidth="3"
                          stroke="white"
                          y2="1.5"
                          x2="26.0357"
                          y1="1.5"
                          x1="12"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 33 39"
                        className="bin-bottom"
                      >
                        <mask fill="white" id="path-1-inside-1_8_19">
                          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                        </mask>
                        <path
                          mask="url(#path-1-inside-1_8_19)"
                          fill="white"
                          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        />
                        <path strokeWidth="4" stroke="white" d="M12 6L12 29" />
                        <path strokeWidth="4" stroke="white" d="M21 6V29" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 89 80"
                        className="garbage"
                      >
                        <path
                          fill="white"
                          d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                        />
                      </svg>
                    </button>
                    <button className="editBtn">
                      <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <button className="btn-ver">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Main;
