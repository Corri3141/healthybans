import { gql } from '@apollo/client';

export const USER_QUERY = gql`query($userId:String){
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
    allergy{
      id
      name
      comment
      medication
    }
  } 
}`