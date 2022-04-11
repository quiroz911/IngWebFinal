import { gql } from "@apollo/client";

const GET_DEPARTMENTS = gql`
  query getDepartments {
    getDepartments {
      id
      name
      employees {
        name
      }
      leader {
        name
      }
      projects {
        name
      }
    }
  }
`;

export { GET_DEPARTMENTS };
