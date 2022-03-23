import { gql } from "apollo-server-micro";

const ProjectTypes = gql`

    type Project{
        id: ID
        name: String
        start_date: Date 
        end_date: Date
        #leader: User
        id_leader: String
        #employees: [User]
        #Department: Department
        departmentId: String
        #files: [File]
    }

    type Query{
        getProjects: [Project]
    }

    type Mutation{
        createProject(name: !String, start_date: !Date): Project
    }
`;

export {ProjectTypes};