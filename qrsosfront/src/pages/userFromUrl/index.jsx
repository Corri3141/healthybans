import React, { useState } from 'react'
import { gql } from '@apollo/client'
import {TextField, Divider, Card, Typography} from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import Loader from "../../components/Loader"

const USER_FROM_URL = gql`
    query($url:String){
        url(url:$url){
            user{
                id
            bloodType
            img
            firstName
            lastName
            dni
            comment
            prepaidHealth
            prepaidId
            emergencyNumber
            importantTypeDisease
            chronicDisease{
              id
              name
              medication
              comment
            }
            allergy{
              id
              name
              comment
              medication
            }
          } 
        }
    }
`

export default function UserDataFromUrl(props) {
    const href = window.location.href
    const url = href.split("url/")[1]
    return (
        <div>
           <Loader query={USER_FROM_URL} variables={{url:url}}>
              {(data) =>
              <>
                <center>
                  <Typography variant="h4">{`${data.url.user.firstName} ${data.url.user.lastName}`} </Typography>
                  <Divider style={{margin:"2%"}} />
                </center>
                {
                  data.url.user.emergencyNumber ?
                  <Alert style={{float:"right", margin:"2%"}} severity="info">{`Numero de Emergencia: ${data.url.user.emergencyNumber}`}</Alert>
                  : null
                }
                {
                  data.url.user.importantTypeDisease ? 
                  <Alert style={{float:"right", margin:"2%"}} severity="error">{`Paciente ${data.url.user.importantTypeDisease}`}</Alert>
                  : null
                }
              </>
                }
           </Loader>
        </div>

    )
}
