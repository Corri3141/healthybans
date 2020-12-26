import { Grid, Typography, Divider} from '@material-ui/core';


function UserTopGrid(props) {
    const {user} = props
    const bloodTransformer = k => {
        const types = {
            A_ : "A+",
            A__1 : "A-",
            B_ :  "B+",
            B__3 : "B-",
            A_0_ : "0+",
            A_0__5 : "0-",
            AB_ :"AB+",
            AB__7:"AB-",
        }
        return types[k]
    }
    return (
        <Grid  container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item xs={12}>                  
                <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{marginTop:"3%"}}>                  
                <Typography variant="h7">{`DNI: ${user.dni}`}</Typography>
            </Grid>
            <Grid item xs={12}>                  
                <Typography variant="h7">{`Obra Social: ${user.prepaidHealth}`}</Typography>
            </Grid>
            <Grid item xs={12}>                  
                <Typography variant="h7">{`N° de afiliado: ${user.prepaidId}`}</Typography>
            </Grid>
            <Grid item xs={12}>                  
                <Typography variant="h7">{`Tipo de sangre: ${bloodTransformer(user.bloodType)}`}</Typography>
            </Grid>
        </Grid>
 
    );
}

export default UserTopGrid;
