import { gql } from "apollo-server-micro";

const EmployeesDiagramTypes = gql`

    type Serie{
        name: String
        data: [Int]
    }

    type DataEmployees {
        series: [Serie]
        categories:[String]
    }

    type Query{
        getDiagramData: DataEmployees
    }
`;

export {EmployeesDiagramTypes};