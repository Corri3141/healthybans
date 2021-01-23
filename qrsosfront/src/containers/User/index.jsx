import Loader from "../../components/Loader"
import UserTopGrid from "./UserTopGrid"
import ChronicPopUp from "./ChronicPopUp"
import AllergiesPopUp from "./Allergies"
import { USER_QUERY } from "./queries/userDataQUery"

const UserData = props => (
  <div style={{margin:"10%"}}>
      <Loader query={USER_QUERY}>
        {/* TODO Esto no me gusta hay que minimizar codigo aca */}
        {/* quizas haya que manejar las queries de otra manera */}
        {(data)=> 
          <div className="card p-4">
            <div className="row">
              <div className="col-4">
                <div className="user__photo">

                </div>
              </div>
              <div className="col-8">
                  < UserTopGrid user ={data.user} />
              </div>
              <div className="col-12 offset-md-4 col-md-8 mt-4">
                  <ChronicPopUp user={data.user} />
              </div>
              <div className="col-12 offset-md-4 col-md-8 mt-4">
                  <AllergiesPopUp user={data.user} />
              </div>
            </div>
          </div>
        }
      </Loader>
  </div>
);

export default UserData;