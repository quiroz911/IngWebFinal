import { gql } from '@apollo/client';

const UPSERT_PROFILE = gql`
  mutation UpdateProfile(
    $where: ProfileWhereUniqueInput!
    $data: ProfileUpdateInput!
  ) {
    updateProfile(where: $where, data: $data) {
      id
      profile {
        address
        phone
        customImage
      }
    }
  }
`;

const UPDATE_IMAGE = gql`
  mutation UpdateProfileImage(
    $where: ProfileWhereUniqueInput!
    $image: String!
  ) {
    updateProfileImage(where: $where, image: $image) {
      id
      profile {
        customImage
      }
    }
  }
`;

export { UPSERT_PROFILE, UPDATE_IMAGE };
