import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  type Profile {
    user: User
    phone: String
    address: String
    customImage: String
  }

  input ProfileWhereUniqueInput {
    id: String!
  }

  input ProfileUpdateInput {
    phone: String
    address: String
    customImage: String
  }

  type Query {
    getProfile(where: FilterId!): Profile
  }

  type Mutation {
    updateProfile(
      where: ProfileWhereUniqueInput!
      data: ProfileUpdateInput!
    ): User

    updateProfileImage(where: ProfileWhereUniqueInput!, image: String!): User
  }
`;
export { ProfileTypes };
