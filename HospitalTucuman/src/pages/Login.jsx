import{ useState, useEffect } from "react";
import { Card,   CardImg,   CardTitle,   Container, Form, Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import AccountCircle from '@mui/icons-material/AccountCircle';
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [usuarios, setUsuarios] = useState([])
  const [usuarioIngresado, setUsuarioIngresado] = useState("")
  const [contrasenaIngresada, setContrasenaIngresada] = useState("")
  const navigate = useNavigate();


// console.log(usuarioIngresado);


  const getUsuario = async () => {

    let response = await axios.get("http://localhost:8000/login")
    const respuesta = response.data
    console.log(respuesta);
    setUsuarios(respuesta)
  
  }




  const handleClick = () => {

    const usuarioEncontrado = usuarios.find(
      usuario => 
        usuario.nombreUsuario === usuarioIngresado && 
        usuario.contrasena === contrasenaIngresada
    );

    if (usuarioEncontrado) {
      navigate('/home');
    } else {
      alert('Usuario o contraseña incorrectos. Por favor, intente nuevamente.');
    }
  };


  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleClick();
    }
  };


  useEffect(() => {
  
    getUsuario()

  }, []);

  

  return (
    <>
      <Container>
        
        <Card className="card">
        <CardTitle className="card-title">
          <h1 className="me-4">Hospital Tucumán</h1>
        <CardImg src="../public/signo-de-hospital.ico"/>
        </CardTitle>
          <Form className="inputs">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="on"
            >
            
            {/* <TextField type="email" id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUsuarioIngresado(e.target.value)}  /> */}
            <TextField
      type="text"
      id="outlined-basic"
      label="Usuario"
      variant="outlined"
      onChange={(e) => setUsuarioIngresado(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      onKeyDown={handleKeyDown} />
            </Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" onChange={(e) => setContrasenaIngresada(e.target.value)}
            onKeyDown={handleKeyDown}
                    >
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>

            <Button type="button" onClick={handleClick} className="mt-5" variant="contained">
              Ingresar
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
