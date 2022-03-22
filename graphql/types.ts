import { gql } from 'apollo-server-micro';
import { UserTypes } from 'graphql/models/users/types';
import { ProfileTypes } from './models/profile/types';
import { RoleTypes } from './models/role/types';

const genericTypes = gql`
  scalar Date

  input StringEditField {
    set: String
  }

  input FloatEditField {
    set: Float
  }

  input IntEditField {
    set: Int
  }

  input DateEditField {
    set: Date
  }
`;

export const types = [
  genericTypes,
  UserTypes,
  RoleTypes,
  ProfileTypes
];
