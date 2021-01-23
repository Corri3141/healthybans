import { Typography, Divider} from '@material-ui/core';

// TODO esto no esta bueno hay que hacer que el backend devuelva lo que necesitamos
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

const UserDetails = ({ user }) => (
    <div className="row">
        <div className="col-12 mb-3">
            <Typography variant="h6">
                {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Divider />
        </div>
        <div className="col-12">
            <Typography variant="h7">
                {`DNI: ${user.dni || ""}`}
            </Typography>
        </div>
        <div className="col-12">
            <Typography variant="h7">
                {`Obra Social: ${user.prepaidHealth || ""}`}
            </Typography>
        </div>
        <div className="col-12">
            <Typography variant="h7">
                {`N° de afiliado: ${user.prepaidId || ""}`}
            </Typography>
        </div>
        <div className="col-12">
            <Typography variant="h7">
                {`Tipo de sangre: ${bloodTransformer[user.bloodType]}`}
            </Typography>
        </div>
    </div>
);

export default UserDetails;
