import { gql } from '@apollo/client'

export const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
      }
    }
  }
`
export const USER_LOGOUT = gql`
  mutation {
    logoutUser
  }
`
