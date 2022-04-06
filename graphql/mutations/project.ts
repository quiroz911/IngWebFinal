import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation Mutation($data: ProjectCreateInput!) {
    createProject(data: $data) {
      id
    }
  }
`;

const EDIT_PROJECT = gql`
mutation Mutation($where: FilterId!, $data: ProjectUpdateInput!) {
  updateProject(where: $where, data: $data) {
    id
  }
}
`;

const DELETE_PROJECT = gql`
mutation Mutation($where: FilterId!) {
  deleteProject(where: $where) {
    id
  }
}
`;

const ADD_MEMBER_PROJECT = gql`
mutation Mutation($where: FilterId!, $employeeEmail: String!) {
  addProjectEmployee(where: $where, employeeEmail: $employeeEmail) {
    id
  }
}
`;
const DELETE_MEMBER_PROJECT = gql`
mutation Mutation($where: FilterId!, $employeeEmail: String!) {
  removeProjectEmployee(where: $where, employeeEmail: $employeeEmail) {
    id
  }
}
`;
const SET_PROJECT_LEADER = gql`
mutation Mutation($where: FilterId!, $userEmail: String!) {
  setProjectLeader(where: $where, userEmail: $userEmail) {
    id
  }
}
`;

export { CREATE_PROJECT, EDIT_PROJECT, DELETE_PROJECT, ADD_MEMBER_PROJECT, DELETE_MEMBER_PROJECT, SET_PROJECT_LEADER };