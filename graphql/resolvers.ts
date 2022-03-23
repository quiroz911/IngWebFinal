import { UserResolvers } from 'graphql/models/users/resolvers';
import { ProfileResolvers } from './models/profile/resolvers';
import { ProjectResolvers } from './models/project/resolvers';
import { RoleResolvers } from './models/role/resolvers';

export const resolvers = [
  UserResolvers,
  RoleResolvers,
  ProfileResolvers,
  UserResolvers,
  ProjectResolvers
];