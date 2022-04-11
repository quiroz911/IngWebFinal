import { gql } from "@apollo/client";

const CREATE_USER_ACCOUNT = gql`
  mutation Mutation($data: CreateUserAccountInput!) {
    createUserAccount(data: $data) {
      id
    }
  }
`;

const EDIT_USER = gql`
  mutation Mutation($where: FilterId!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
  }
}
`;

const DELETE_USER = gql`
  mutation DeleteUser($where: FilterId!) {
    deleteUser(where: $where) {
      id
    }
  }
`;

export { CREATE_USER_ACCOUNT, DELETE_USER, EDIT_USER };
