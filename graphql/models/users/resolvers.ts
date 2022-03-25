import prisma from "config/prisma";

const UserResolvers = {
  User: {
    role: async (parent, args) => {
      return await prisma.role.findUnique({
        where: {
          id: parent.roleId,
        },
      });
    },
  },
  Query: {
    getUsers: async (parent, args) => {
      return await prisma.user.findMany({});
    },
    getUser: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    },
  },
};

export { UserResolvers };
