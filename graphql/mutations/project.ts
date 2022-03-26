import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation Mutation($data: ProjectCreateInput!) {
    createProject(data: $data) {
      id
    }
  }
`;

export { CREATE_PROJECT };