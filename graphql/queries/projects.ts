import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
        id
      name
      start_date
      end_date
      employees {
        name
      }
      leader {
        name
      }
    }
  }
`;

export { GET_PROJECTS };