import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: Date
    image: String
    projectLeader: [Project]
    projectLeaderId: String
    ProjectMember: [Project]
    projectMemberId: String
    Department: Department
    departmentId: String
    departmentLeader: Department
    departmentLeaderId: String
    role: Role
    roleId: String
    accounts: [Account]
    session: [Session]
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUsers: [User]
    getUser(email: String!): User
  }
`;

export { UserTypes };
