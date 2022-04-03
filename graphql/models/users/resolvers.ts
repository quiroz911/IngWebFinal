import prisma from "config/prisma";

const UserResolvers = {
  User: {
    projectLeader: async (parent, args) => {
      return await prisma.project.findMany({
          where: {
            id_leader: parent.id
          },
      });
    },
    projectMember: async (parent, args) => {
      return await prisma.project.findMany({
          where: {
            employees:{
                  some: {
                      id: parent.id,
                  }
              }
          },
      });
    },
    department: async (parent, args) => {
      return await prisma.department.findUnique({
          where: {
            id: parent.departmentId
          },
      });
    },
    departmentLeader: async (parent, args) => {
      return await prisma.department.findMany({
        where: {
          departmentLeaderId: parent.id
        },
      });
    },
    role: async (parent, args) => {
      return await prisma.role.findUnique({
          where: {
            id: parent.roleId
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
  Mutation: {
    createUser: async (parent, args) => {
        return await prisma.user.create({
            data:{
                ...args.data,
            }
        })
    },
    updateUser: async(parent, args) => {
        return await prisma.user.update({
            where: { ...args.where },
            data: {
                ...args.data,
            },
            // usar connect
        })
    },
    deleteUser: async (parent,args) => {
        return await prisma.user.delete({
            where: { ...args.where },
        });
    }
  }
};

export { UserResolvers };
