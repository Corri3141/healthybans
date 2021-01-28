import {Drawer, AppBar , List, ListItem, ListItemIcon, IconButton, Toolbar, Divider  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import BackupIcon from '@material-ui/icons/Backup';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import {useAuth} from "../../Auth/index" 

const useStyles = makeStyles({
  paper: {
    background: '#e8dec5',
  }
});


export default function Navbar(props){
    const [isDrawerOpen, setDrawerState] = useState(false)
    const history = useHistory();
    const styles = useStyles();
    const {logout} = useAuth()


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
        <AppBar style={{backgroundColor:"#b3a584"}}>
            <Toolbar>
            <IconButton edge="start" style={{color:"white"}} onClick={handleOpenDrawer}>
                <MenuIcon />
            </IconButton>
            </Toolbar>

        </AppBar>        

        
        <Drawer classes={{ paper: styles.paper }}  anchor="left" open={isDrawerOpen} onClose={handleClose}>
                    <List>
                    <ListItem button onClick={()=>routeChange("home")}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            Home
                    </ListItem>
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
                        <ListItem button onClick={logout}>
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