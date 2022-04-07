import { gql } from "apollo-server-micro";

const UserTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    emailVerified: Date
    projectLeader: [Project]
    projectMember: [Project]
    department: Department
    departmentId: String
    departmentLeader: [Department]
    image: String
    role: Role
    roleId: String
    profile: Profile
    #accounts: [Account]
    #sessions: [Session]
    createdAt: Date
    updatedAt: Date
  }

  input CreateUserAccountInput {
    email: String!
    name: String!
    image: String!
    auth0Id: String!
    role: String!
  }

  input UserUpdateInput {
    name: String
    image:  String
    email: String
    roleId: String
  }

  input UserCreateInput {
    name: String!
    email: String!
    roleId: String!
  }

  type Query {
    getUsers: [User]
    getUser(email: String!): User
  }

  type Mutation {
    createUser(data: UserCreateInput!): User
    updateUser(where: FilterId!, data: UserUpdateInput!): User
    deleteUser(where: FilterId!): User
    addProjectLeaded(where: FilterId!, projectId: String!): User
    changeUserDepartment(where: FilterId!, changeToDepartmentId: String!): User
  }

  type Mutation {
    createUserAccount(data: CreateUserAccountInput!): User
  }
`;

export { UserTypes };
