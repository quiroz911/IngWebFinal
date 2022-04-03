import { gql } from "apollo-server-micro";

const UserTypes = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: Date
    image: String
    projectLeader: [Project]
    ProjectMember: [Project]
    Department: Department
    departmentId: String
    departmentLeader: Department
    departmentLeaderId: String
    role: Role
    roleId: String
    #accounts: [Account]
    #sessions: [Session]
    createdAt: Date
    updatedAt: Date
  }

  input DepartmentUpdateInput{
        name: String!
        departmentLeaderId: String!
    }

    input DepartmentCreateInput{
        name: String!
        departmentLeaderId: String!
    }

    type Query{
        getDepartments: [Department]
        getDepartment(where: FilterId!): Department
    }
`;

export { UserTypes };
