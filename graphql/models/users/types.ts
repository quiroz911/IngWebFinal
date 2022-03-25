import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    image: String
    role: Role
    emailVerified: Date
    # isProjectLeaderOf: [Project]
    profile: Profile
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUsers: [User]
    getUser(email: String!): User
  }
`;

export { UserTypes };
