import prisma from 'config/prisma';

const UserResolvers = {
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