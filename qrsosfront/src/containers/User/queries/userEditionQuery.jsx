import { gql } from '@apollo/client';

export const USER_EDITION = gql`
  mutation EditUser($id: String,
                         $firstName: String,
                         $lastName:String,
                         $prepaidHealth:String,
                         $emergencyNumber:String,
                         $prepaidId:String,
                         $dni:String,
                         $bloodType:String,) {
        editUser(
        id: $id,
        firstName: $firstName,
        lastName: $lastName,
        prepaidHealth: $prepaidHealth,
        emergencyNumber: $emergencyNumber,
        dni:$dni,
        prepaidId:$prepaidId,
        bloodType:$bloodType,) {
      user{
          id
      }
    }
  }
`;