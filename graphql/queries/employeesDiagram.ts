import {gql} from '@apollo/client';

const GET_DIAGRAM_DATA = gql`
query GetDiagramData {
  getDiagramData {
    series {
      name
      data
    }
    categories
  }
}
`
export { GET_DIAGRAM_DATA };