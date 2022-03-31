import { gql } from 'apollo-server-micro';
import { UserTypes } from 'graphql/models/users/types';
import { ProfileTypes } from 'graphql/models/profile/types';
import { RoleTypes } from 'graphql/models/role/types';
import { ProjectTypes } from 'graphql/models/project/types';
import { DepartmentTypes } from './models/department/types';

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

  input FilterId{
    id: String!
  }
  
`;

export const types = [
  genericTypes,
  UserTypes,
  RoleTypes,
  ProfileTypes,
  ProjectTypes,
  DepartmentTypes
];
