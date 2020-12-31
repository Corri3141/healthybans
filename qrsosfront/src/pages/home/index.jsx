import Loader from "../../components/Loader"
import {USER_QUERY} from "../../containers/User/queries/userDataQUery"
import {Typography} from "@material-ui/core"

export default function Home(props){
    return(
        <div style={{margin:"10%"}}>
        <Loader query={USER_QUERY} variables={{userId:1}}>
            {data=>
            <center><Typography variant="h4">{`¡Hola ${data.user.firstName}!`}</Typography></center>
            }
        </Loader>
        </div>

    )
}