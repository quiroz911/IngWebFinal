import { UserResolvers } from 'graphql/models/users/resolvers';
import { ProfileResolvers } from 'graphql/models/profile/resolvers';
import { ProjectResolvers } from 'graphql/models/project/resolvers';
import { RoleResolvers } from 'graphql/models/role/resolvers';
import { DepartmentResolvers } from './models/department/resolvers';
import { EmployeesDiagramResolvers } from './models/diagram/resolvers';

export const resolvers = [
  UserResolvers,
  RoleResolvers,
  ProfileResolvers,
  ProjectResolvers,
  DepartmentResolvers,
  EmployeesDiagramResolvers
];
