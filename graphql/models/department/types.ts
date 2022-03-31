import { gql } from "apollo-server-micro";

const DepartmentTypes = gql`

    type Department{
        id: String
        name: String
        employees: [User]
        departmentLeaderId: String
        leader: User
        projects: [Project]
        userId: String
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

    type Mutation{
        createDepartment(data: DepartmentCreateInput!): Department
        updateDepartment(where: FilterId!, data: DepartmentUpdateInput!): Department
        deleteDepartment(where:FilterId!): Department
    }
`;

export {DepartmentTypes};