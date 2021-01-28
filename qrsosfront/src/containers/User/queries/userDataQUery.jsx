import { gql } from '@apollo/client';

export const USER_QUERY = gql`{
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