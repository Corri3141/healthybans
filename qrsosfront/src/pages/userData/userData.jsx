import { gql } from '@apollo/client';
import Loader from "../../components/Loader"
import {Card, Grid, Dialog} from '@material-ui/core';
import UserTopGrid from "./UserTopGrid"
import ChronicPopUp from "./ChronicPopUp"

const USER_QUERY = gql`query($userId:String){
  user(userId:$userId){
		id
    bloodType
    img
    firstName
    lastName
    dni
    comment
    prepaidHealth
    prepaidId
    chronicDisease{
      id
      name
      medication
      comment
    }
  } 
}`

function userData(props) {  
  return (
    <div>
        <Loader query={USER_QUERY} variables={{userId:1}}>
          {(data)=> 
          <Card>

              <Grid  container>
                <Grid item xs={4}>
                  <Card style={{height:130,width:100,backgroundColor:"green"}}>
                  </Card>
                </Grid>  

                  <Grid item xs={8}>
                    < UserTopGrid user ={data.user} />
                  </Grid>  

                  <Grid style={{marginTop:"5%"}} item xs={6}>
                    <ChronicPopUp user={data.user} />
                  </Grid>  

              </Grid>
            </Card>

            }
        </Loader>
      </div>
  );
}

export default userData;
