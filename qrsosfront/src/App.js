import { gql } from '@apollo/client';
import Loader from "./components/Loader"
const USER_QUERY = gql`query($userId:String){
  user(userId:$userId){
		id
    bloodType
    img
  } 
}`

function App() {
  return (
        <Loader query={USER_QUERY} variables={{userId:1}}>
          {(data)=> JSON.stringify(data)}
        </Loader>
  );
}

export default App;
