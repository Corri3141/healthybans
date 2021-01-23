import { TextField, Button, Typography, Divider, Grid, InputAdornment, Card, IconButton, Fade, Select, FormControl, InputLabel, MenuItem   } from '@material-ui/core';
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
        style={{margin:"2%"}}
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


function CustomSelect(props){
    const {selected, options, onChange, label} = props
    const handleChange = (e) => {
        const value = options[e.target.value]
        onChange({currentTarget:{value:value}})
    }
     return(
        <FormControl style={{width:200}}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={options.findIndex((i)=> i == selected)}
          onChange={handleChange}
        >
            {options.map(item=> 
                <MenuItem value={options.findIndex((i)=> i == item)}>{item}</MenuItem>  
            )}
        </Select>
      </FormControl>
     )
}




function UserEditor(props){
    return (
        <Loader query={USER_QUERY}>
            {data =>
            <UserMutator user={data.user}/>}
        </Loader>
    )

}

const bloodTransformer = {
    A_ : "A+",
    A__1 : "A-",
    B_ :  "B+",
    B__3 : "B-",
    A_0_ : "0+",
    A_0__5 : "0-",
    AB_ :"AB+",
    AB__7:"AB-",
}

function UserMutator(props){  
    const [handleMutate, { data }] = useMutation(USER_EDITION);
    const [variables,setVariables] = useState({id:"1",
                                               firstName:props.user.firstName,
                                               lastName:props.user.lastName,
                                               dni:props.user.dni,
                                               prepaidHealth:props.user.prepaidHealth,
                                               emergencyNumber:props.user.emergencyNumber,
                                               prepaidId:props.user.prepaidId,
                                               bloodType:bloodTransformer[props.user.bloodType]})


    const [alert, setAlert] = useState({severity:null,message:""})

    const handleChange = (e, variable) => {
        console.log(e.currentTarget)
        setVariables({...variables, [variable]:e.currentTarget.value})
    }

    const handleAlert = () => {
        setAlert({severity:"success", message:"se modifico tu perfil correctamente"})
        setTimeout(function(){ setAlert({severity:null,message:""}); }, 3000);
    }

    const handleSave = () => {
        handleMutate({variables:variables})
        .then(()=>handleAlert())
        .catch(e=>console.log(e))
    }

    const bloodTypeOptions = Object.keys(bloodTransformer).map(k => bloodTransformer[k])

    return(
        <div style={{margin:"10%"}}>
            <center><Typography variant="h5">Editar Perfil</Typography></center>
            <Divider />
            {/* First Line */}
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
                        onChange={e => handleChange(e, "emergencyNumber")}
                        label="Numero de Emergencia"
                        defaultValue={props.user.emergencyNumber}
                        state={variables.emergencyNumber}/>    
              
                    </Grid>
                </Grid>
                {/* Second line */}
                <Grid style={{margin:"2%"}} xs={3}>
                    <CustomInput
                            onChange={e => handleChange(e, "prepaidHealth")}
                            label="Obra Social"
                            defaultValue={props.user.prepaidHealth}
                            state={variables.prepaidHealth}/>           
                </Grid>

                <Grid style={{margin:"2%"}} xs={3}>
                        <CustomInput
                        onChange={e => handleChange(e, "prepaidId")}
                        label="Numero de afiliado"
                        defaultValue={props.user.prepaidId}
                        state={variables.prepaidId}/>                
                </Grid>
                <Grid style={{margin:"2%"}} xs={3}>
                        <CustomSelect
                        onChange={e => handleChange(e, "bloodType")}
                        label="Tipo de sangre"
                        selected={variables.bloodType}
                        options={bloodTypeOptions}/>                
                </Grid>

            </Grid>
            <Button color="primary" variant="contained" style={{position:"absolute", bottom:40, right:30}} onClick={handleSave}>guardar</Button>

        {alert.severity ? 
            <Fade in={alert.severity}>
                <Alert variant="filled" style={{position:"absolute", bottom:30, left:30}} severity={alert.severity}>{alert.message}</Alert>
            </Fade>
         : null}
        </div>
    )
}

export default UserEditor