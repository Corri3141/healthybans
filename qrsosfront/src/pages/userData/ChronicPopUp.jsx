import Loader from "../../components/Loader"
import {ListItem, ListItemText, Collapse, List , Dialog, Button} from '@material-ui/core';
import { useState } from "react";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


function ChronicPopUp(props) {
    const {user} = props
    const initialStates = {}
    user.chronicDisease.map(item=> initialStates[item.id] = false )
    const [isOpen, setOpen] = useState(false)
    const [expand, setExpand] = useState(false)
    const [selected, setSelected] = useState(initialStates)

    const handleOpen = (e) =>{
        setOpen(true)
    }

    const handleClose = (e) => {
        setOpen(false)
    }

    const handleClick = (id) => {
        setSelected({...selected, [id]:!selected[id]})
    }

    return (
        <div>
            <Button color="primary" variant="contained" style={{width:"100%"}} onClick={handleOpen}>Enfermedades Cronicas</Button>
            <Dialog style={{height:"100%",width:"100%"}} onClose={handleClose} open={isOpen}>
                <List>
                    {user.chronicDisease.map(item=>
                    <>
                        <ListItem button onClick={()=>handleClick(item.id)}>
                        <ListItemText primary={item.name} />
                            {selected[item.id] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={selected[item.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem>
                                {`Medicacion: ${item.medication}`}
                            </ListItem>
                        </List>
                    </Collapse>        
                    </>)}

                </List>
        
            </Dialog>
        </div>
  );
}

export default ChronicPopUp;
