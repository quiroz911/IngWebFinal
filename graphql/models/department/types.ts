import { gql } from "apollo-server-micro";

const DepartmentTypes = gql`

    type Department{
        id: String
        name: String
        employees: User[]
        id_leader: String
        projects: [Project]
        userId: String
    }

    input DepartmentUpdateInput{
        name: StringEditField
        id_leader: StringEditField
    }

    input DepartmentCreateInput{
        name: StringEditField
        id_leader: StringEditField
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