import { gql } from "@apollo/client";

const CREATE_DEPARTMENT = gql`
  mutation Mutation($data: DepartmentCreateInput!) {
    createDepartment(data: $data) {
      id
    }
  }
`;

const EDIT_DEPARTMENT = gql`
  mutation Mutation($where: FilterId!, $data: DepartmentUpdateInput!) {
    updateDepartment(where: $where, data: $data) {
      id
    }
  }
`;

const DELETE_DEPARTMENT = gql`
mutation Mutation($where: FilterId!) {
  deleteDepartment(where: $where) {
    id
  }
}
`;

export { CREATE_DEPARTMENT, EDIT_DEPARTMENT, DELETE_DEPARTMENT };
