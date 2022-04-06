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

export { GET_USERS };
