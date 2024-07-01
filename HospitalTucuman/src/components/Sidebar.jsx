import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material'
import "../css/Sidebar.css"


const drawerWidth = 200;

const Sidebar = () => {
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
            <Link className='link' to={"/home"}>
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
            </Link>
          </Toolbar>

          <Divider />
          <List className="full-height">
            <ListItem>
              <Link className='link' to={"/pacientes"}>
              <ListItemButton className="item-button">
                👨🏻 Pacientes
              </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
            <Link className='link' to={"/medicos"}>
            <ListItemButton className="item-button">
                👨🏻‍⚕️ Medicos
              </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link className='link' to={"/turnos"}>
              <ListItemButton className="item-button">✍🏻 Turnos</ListItemButton>
            </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link className='link' to={"/hc"}>
              <ListItemButton className="item-button">
                🕑 Historial
              </ListItemButton>
              </Link>
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
    
    
    
    </>
  )
}

export default Sidebar