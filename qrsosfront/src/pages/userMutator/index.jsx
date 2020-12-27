import { TextField, Typography, Divider, Grid, InputAdornment } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useState } from 'react';
import Loader from "../../components/Loader"
import {USER_QUERY} from "../../containers/User/queries/userDataQUery"

function UserEditor(props){
    return (
        <Loader query={USER_QUERY} variables={{userId:1}}>
            {data =>
            <UserMutator user={data.user}/>}
        </Loader>
    )

}

function UserMutator(props){
    const [name, setName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)

    const handleChange = (e,f) => {
        f(e.currentTarget.value)
    }
    return(
        <div>
            <center><Typography variant="h5">Editar Perfil</Typography></center>
            <Divider />
            <Grid  container style={{margin:"2%"}}>
                <Grid style={{margin:"2%"}} item xs={5}>
                <TextField
                    onChange={ e => handleChange(e,setName)}
                    label="Nombre"
                    defaultValue={props.user.firstName}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <DoneIcon color={name ? "primary" : "dafault"} />
                        </InputAdornment>
                    ),}}/>                
                </Grid>
                <Grid style={{margin:"2%"}} item xs={5}>
                <TextField
                    onChange={ e => handleChange(e,setLastName)}
                    label="Nombre"
                    defaultValue={props.user.lastName}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <DoneIcon color={lastName ? "primary" : "dafault"} />
                        </InputAdornment>
                    ),}}/>                
                </Grid>
            </Grid>

        </div>
    )
}

export default UserEditor