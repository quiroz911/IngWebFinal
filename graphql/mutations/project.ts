import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation Mutation($data: ProjectCreateInput!) {
    createProject(data: $data) {
      id
    }
  }
`;

const EDIT_PROJECT = gql`
mutation Mutation($data: ProjectCreateInput!) {
  createProject(data: $data) {
    id
  }
}
`;

export { CREATE_PROJECT, EDIT_PROJECT };