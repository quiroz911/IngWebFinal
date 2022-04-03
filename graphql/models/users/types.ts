import { gql } from "apollo-server-micro";

const UserTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    emailVerified: Date
    image: String
    projectLeader: [Project]
    projectMember: [Project]
    department: Department
    departmentId: String
    departmentLeader: [Department]
    role: Role
    roleId: String
    #accounts: [Account]
    #sessions: [Session]
    createdAt: Date
    updatedAt: Date
  }

    input UserUpdateInput{
        name: String
        email: String
        image: String
        departmentId: String
        roleId: String
        departmentLeaderId: String
    }

    input UserCreateInput{
        name: String!
        email: String!
        roleId: String!
    }

    type Query{
        getUsers: [User]
        getUser(where: FilterId!): User
    }

    type Mutation{
        createUser(data: UserCreateInput!): User
        updateUser(where: FilterId!, data: UserUpdateInput!): User
        deleteUser(where: FilterId!): User
    }
`;

export { UserTypes };
