import{ useState, useEffect } from "react";
import { Card, CardHeader, Container, Form } from "react-bootstrap";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [usuario, setUsuario] = useState([])
  const [contrasena, setContrasena] = useState([])
  const [usuarioIngresado, setUsuarioIngresado] = useState("")
  const [contrasenaIngresada, setContrasenaIngresada] = useState("")
  const navigate = useNavigate();


// console.log(usuarioIngresado);


  const getUsuario = async () => {

    let response = await axios.get("http://localhost:8000/login")
    const respuesta = response.data
    // console.log(respuesta);
    respuesta.map((res)=>{
      // console.log(res.nombreUsuario);
      // setUsuario(); 
      // setContrasena(res.contrasena);
    })
    
  
  }

  console.log(usuario);
const handleClick = () =>{

if ((usuario && contrasena) === (usuarioIngresado && contrasenaIngresada)) {
  navigate("/home")
}
else{
  alert("incorrecto")
}

}
console.log(usuarioIngresado,contrasenaIngresada);

  useEffect(() => {
  
    getUsuario()

  }, [usuario]);

  

  return (
    <>
      <Container>
        <Card className="card">
          <Form className="inputs">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
            
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setUsuarioIngresado(e.target.value)}  />
            </Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" onChange={(e) => setContrasenaIngresada(e.target.value)}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
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
                label="Password"
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
