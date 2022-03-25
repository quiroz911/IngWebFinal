import prisma from "config/prisma";

const RoleResolvers = {
  Query: {
    getRoles: async (parent, args) => {
      console.log(prisma.role);
      return await prisma.role.findMany();
    },
  },
};

export { RoleResolvers };
