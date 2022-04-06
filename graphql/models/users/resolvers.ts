import prisma from "config/prisma";

const UserResolvers = {
  User: {
    projectLeader: async (parent, args) => {
      return await prisma.project.findMany({
        where: {
          leader: {
            id: {
              equals: parent.id,
            },
          },
        },
      });
    },
    projectMember: async (parent, args) => {
      return await prisma.project.findMany({
        where: {
          employees: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
    department: async (parent, args) => {
      if (!parent.departmentId) {
        return null;
      }
      return await prisma.department.findUnique({
        where: {
          id: parent.departmentId,
        },
      });
    },
    departmentLeader: async (parent, args) => {
      return await prisma.department.findMany({
        where: {
          departmentLeaderId: parent.id,
        },
      });
    },
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
        where: { ...args.where },
      });
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      return await prisma.user.create({
        data: {
          ...args.data,
        },
      });
    },
    updateUser: async (parent, args) => {
      return await prisma.user.update({
        where: { ...args.where },
        data: { ...args.data },
      });
    },
    changeUserDepartment: async (parent, args) => {
      return await prisma.user.update({
        where: { ...args.where },
        data: {
          department: {
            connect: {
              id: args.changeToDepartmentId,
            },
          },
        },
      });
    },
    addProjectLeaded: async (parent, args) => {
      return await prisma.user.update({
        where: { ...args.where },
        data: {
          projectLeader: {
            connect: {
              id: args.projectId,
            },
          },
        },
      });
    },
    deleteUser: async (parent, args) => {
      return await prisma.user.delete({
        where: { ...args.where },
      });
    },
    createUserAccount: async (parent, args) => {
      return await prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          image: args.data.image,
          role: {
            connect: {
              name: args.data.role,
            },
          },
          accounts: {
            create: {
              provider: "auth0",
              type: "oauth",
              providerAccountId: args.data.auth0Id,
            },
          },
        },
      });
    },
  },
};

export { UserResolvers };
