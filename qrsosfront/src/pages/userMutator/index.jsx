import { TextField, Typography, Divider, Grid, InputAdornment, Card, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useState } from 'react';
import Loader from "../../components/Loader"
import {USER_QUERY} from "../../containers/User/queries/userDataQUery"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

function CustomInput(props){
    const handleChange = (e,f) => {
        f(e.currentTarget.value)
    }
    return(
        <TextField
        onChange={ e => handleChange(e,props.f)}
        label={props.label}
        defaultValue={props.defaultValue}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <DoneIcon color={props.state ? "primary" : "dafault"} />
            </InputAdornment>
        ),}}/>      
    )
}

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

    return(
        <div>
            <center><Typography variant="h5">Editar Perfil</Typography></center>
            <Divider />
            <Grid  container style={{margin:"2%"}}>
                <Grid style={{margin:"2%"}} item xs={5}>
                    <Card style={{backgroundColor:"#d4d0c5", height:200,width:160}}>
                        <IconButton style={{color:"white"}}><AddAPhotoIcon /></IconButton>
                    </Card>
                </Grid>
                <Grid style={{margin:"2%"}} container xs={5}>
                    <Grid style={{margin:"2%"}} item xs={6}>
                    <CustomInput
                        f={setName}
                        label="Nombre"
                        defaultValue={props.user.firstName}
                        state={name}/>                
                    </Grid>
                    <Grid style={{margin:"2%"}} item xs={6}>
                    <CustomInput
                        f={setLastName}
                        label="Apellido"
                        defaultValue={props.user.lastName}
                        state={lastName}/>                
                    </Grid>
                </Grid>

            </Grid>

        </div>
    )
}

export default UserEditor