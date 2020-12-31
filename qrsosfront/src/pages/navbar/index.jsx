import {Drawer, AppBar , List, ListItem, ListItemIcon, IconButton, Toolbar  } from '@material-ui/core';
import Loader from "../../components/Loader"
import {USER_QUERY} from "../../containers/User/queries/userDataQUery"
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import BackupIcon from '@material-ui/icons/Backup';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";



export default function Navbar(props){
    const [isDrawerOpen, setDrawerState] = useState(false)
    const history = useHistory();

    const routeChange = (path) =>{  
        history.push(path);
    }

    const handleOpenDrawer = e => {
        setDrawerState(true)
    }

    const handleClose = e =>{
        setDrawerState(false)
    }

    return(
        <div style={{width:"100%"}}>
        <AppBar>
            <Toolbar>
            <IconButton edge="start" style={{color:"white"}} onClick={handleOpenDrawer}>
                <MenuIcon />
            </IconButton>
            </Toolbar>

        </AppBar>        

        
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleClose}>
                    <List>
                        <ListItem button onClick={()=>routeChange("profile")}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            Perfil
                        </ListItem>
                        <ListItem button onClick={()=>routeChange("edit")}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            Editar Perfil
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <BackupIcon />
                            </ListItemIcon>
                            Cargar Archivos
                        </ListItem>


                    </List>
                    <List style={{position:"absolute", bottom:5}}>
                        <ListItem button>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                Cerrar Sesión
                            </ListItem>

                    </List>
                </Drawer>
        </div>

    )
}