import { TextField, Button, Typography, Divider, Grid, InputAdornment, Card, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useState } from 'react';
import Loader from "../../components/Loader"
import {USER_QUERY} from "../../containers/User/queries/userDataQUery"
import {USER_EDITION} from "../../containers/User/queries/userEditionQuery"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useMutation } from '@apollo/client';
import Alert from '@material-ui/lab/Alert';

function CustomInput(props){

    return(
        <TextField
        onChange={ e => props.onChange(e)}
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
    const [handleMutate, { data }] = useMutation(USER_EDITION);
    const [variables,setVariables] = useState({id:"1",
                                               firstName:props.user.firstName,
                                               lastName:props.user.lastName,
                                               dni:props.user.dni,
                                               prepaidHealth:props.user.prepaidHealth})
    const [alert, setAlert] = useState({severity:null,message:""})

    const handleChange = (e, variable) => {
        setVariables({...variables, [variable]:e.currentTarget.value})
    }

    const handleSave = () => {
        handleMutate({variables:variables})
        .then(()=>setAlert({severity:"success", message:"se modifico tu perfil correctamente"}))
        .catch(e=>console.log(e))
    }

    return(
        <div>
            <center><Typography variant="h5">Editar Perfil</Typography></center>
            <Divider />
            <Grid  container style={{margin:"2%"}}>
                <Grid style={{margin:"2%"}} item xs={3}>
                    <Card style={{backgroundColor:"#d4d0c5", height:200,width:160}}>
                        <IconButton style={{color:"white"}}><AddAPhotoIcon /></IconButton>
                    </Card>
                </Grid>
                <Grid style={{margin:"2%"}} container xs={5}>
                    <Grid item xs={6}>
                    <CustomInput
                        onChange={ e => handleChange(e, "firstName")}
                        label="Nombre"
                        defaultValue={props.user.firstName}
                        state={variables.firstName}/>                
                    </Grid>
                    <Grid  item xs={6}>
                    <CustomInput
                        onChange={e => handleChange(e,"lastName")}
                        label="Apellido"
                        defaultValue={props.user.lastName}
                        state={variables.lastName}/>                
                    </Grid>
                    <Grid  item xs={6}>
                    <CustomInput
                        onChange={e => handleChange(e,"dni")}
                        label="DNI"
                        defaultValue={props.user.dni}
                        state={variables.dni}/>                
                    </Grid>
                    <Grid  item xs={6}>
                    <CustomInput
                        onChange={e => handleChange(e, "prepaidHealth")}
                        label="Obra Social"
                        defaultValue={props.user.prepaidHealth}
                        state={variables.prepaidHealth}/>                
                    </Grid>
                </Grid>
                    <Button onClick={handleSave}>guardar</Button>
            </Grid>
        {alert.severity ? <Alert severity={alert.severity}>{alert.message}</Alert> : null}
        </div>
    )
}

export default UserEditor