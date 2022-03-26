import { gql } from "apollo-server-micro";

const DepartmentTypes = gql`

    type Department{
        id: ID
        name: String
        start_date: Date 
        end_date: Date
        leader: User
        id_leader: String
        employees: [User]
        #Department: Department
        departmentId: String
        #files: [File]
    }

    input DateEditField {
        set: Date
    }

    input StringEditField {
        set: String
    }

    input DepartmentUpdateInput{
        name: StringEditField
        start_date: DateEditField
        end_date: DateEditField
        id_leader: StringEditField
    }

    input DepartmentCreateInput{
        name: String!
        start_date: Date!
        end_date: Date!
        id_leader: String!
    }

    type Query{
        getDepartments: [Department]
        getDepartment: Department
    }

    type Mutation{
        createDepartment(data: DepartmentCreateInput!): Department
        updateDepartment(where: FilterId!, data: DepartmentUpdateInput!): Department
        deleteDepartment(where:FilterId!): Department
    }
`;

export {DepartmentTypes};