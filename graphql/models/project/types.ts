import { gql } from "apollo-server-micro";

const ProjectTypes = gql`

    type Project{
        id: ID
        name: String
        start_date: Date 
        end_date: Date
        leader: User
        id_leader: String
        employees: [User]
        department: Department
        departmentId: String
        #files: [File]
        createdAt: Date
        updatedAt: Date
    }

    input ProjectUpdateInput{
        name: StringEditField
        start_date: DateEditField
        end_date: DateEditField
        id_leader: StringEditField
    }

    input ProjectCreateInput{
        name: String!
        start_date: Date!
        end_date: Date!
    }

    type Query{
        getProjects: [Project]
        getProject(where: FilterId!): Project
    }

    type Mutation{
        createProject(data: ProjectCreateInput!): Project
        updateProject(where: FilterId!, data: ProjectUpdateInput!): Project
        addProjectEmployee(where:FilterId!, employeeEmail: String!): Project
        removeProjectEmployee(where:FilterId!, employeeEmail: String!): Project
        deleteProject(where:FilterId!): Project
        setProjectLeader(where:FilterId!, userEmail: String!): Project
        changeProjectDepartment(where:FilterId!, changeToDepartmentId: String!): Project
    }
`;

export {ProjectTypes};