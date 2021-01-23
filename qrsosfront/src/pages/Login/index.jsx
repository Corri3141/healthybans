import React, { useState, createContext, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import {TextField, Button, Card} from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import {useAuth} from "../../Auth/index" 

const LOGIN = gql`
    mutation user_auth($input: ObtainJSONWebTokenInput!) {
        tokenAuth(input: $input) {
            token
        }
    }
`

const Login = () => {
    const { user, authenticate } = useAuth()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({severity:null,message:""})

    const [login, {loading, error}] = useMutation(LOGIN)

    const handleAlert = (error) => {
        setAlert({severity:"error", message:error})
        setTimeout(function(){ setAlert({severity:null,message:""}); }, 3000);
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        login({
            variables: {
                input: {
                    username: userName,
                    password: password
                }
            }
        })
        .then(res => {
            const authToken = res.data.tokenAuth.token
            authenticate(authToken)
        })
        .catch(err => {handleAlert(err.message)})
    }

    return (
        <div style={{marginTop:"20%"}}>
            <center>
                <Card style={{width:"30%"}}>
                    <div style={{margin:"5%"}}>
                        <TextField variant="outlined" label="Nombre de usuario" onChange={ e=> setUserName(e.currentTarget.value)} />
                    </div>
                    <div style={{margin:"5%"}}>
                        <TextField variant="outlined" type="password" label="contraseña" onChange={ e=> setPassword(e.currentTarget.value)} />
                    </div>
                    <div  style={{margin:"5%"}}>
                        <Button style={{width:"100%"}} color="primary" variant="contained" onClick={handleSubmit}> Ingresar </Button>
                    </div>
                    <a href="/create" style={{float:"left", margin:"2%"}}>Crear Cuenta</a>

                </Card>
            </center>

            {alert.severity ? <Alert style={{position:"absolute",left:30,bottom:15}} severity={alert.severity}>{alert.message}</Alert>: null}
        </div>

    )
}

export default Login