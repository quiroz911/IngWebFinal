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
        #Department: Department
        departmentId: String
        #files: [File]
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
        id_leader: String!
    }

    type Query{
        getProjects: [Project]
        getProject(where: FilterId!): Project
    }

    type Mutation{
        createProject(data: ProjectCreateInput!): Project
        updateProject(where: FilterId!, data: ProjectUpdateInput!): Project
        addProjectEmployee(where:FilterId!, data: FilterId!): Project
        deleteProject(where:FilterId!): Project
    }
`;

export {ProjectTypes};