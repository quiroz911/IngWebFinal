import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      role {
        name
      }
      updatedAt
      createdAt
    }
  }
`;

const GET_PROFILE = gql`
  query Query($email: String!) {
    getUser(email: $email) {
      id
      email
      name
      image
      profile {
        address
        phone
        customImage
      }
    }
  }
`;

export { GET_USERS, GET_PROFILE };
