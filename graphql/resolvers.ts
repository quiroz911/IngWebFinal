import { UserResolvers } from "graphql/models/users/resolvers";
import { ProfileResolvers } from "graphql/models/profile/resolvers";
import { RoleResolvers } from "graphql/models/role/resolvers";

export const resolvers = [UserResolvers, RoleResolvers, ProfileResolvers];
