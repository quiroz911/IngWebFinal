import prisma from "config/prisma";

const ProjectResolvers = {
    Project: {
        leader: async (parent, args) => {
            if(!parent.id_leader){
                return null;
            }
            return await prisma.user.findUnique({
                where: {
                    id: parent.id_leader,
                },
            });
        },
        /*files: async (parent, args) => {
            return await prisma.file.findMany({
                where: {
                    projectId: parent.id,
                },
            });
        },*/
        department: async (parent, args) => {
            if(!parent.departmentId){
                return null;
            }
            return await prisma.department.findUnique({
                where: {
                  id: parent.departmentId,
                },
            });
        },
        employees: async (parent, args) => {
            return await prisma.user.findMany({
                where: {
                    projectMember:{
                        some: {
                            id: parent.id,
                        }
                    }
                },
            });
        },
    },
    Query: {
        getProjects: async (parent, args) => {
            return await prisma.project.findMany({});
        },
        getProject: async (parent, args) => {
            return await prisma.project.findUnique({
                where: { ...args.where },
            });
        },
    },
    Mutation: {
        createProject: async (parent, args) => {
            return await prisma.project.create({
                data:{
                    ...args.data,
                    start_date: new Date(args.data.start_date),
                    end_date: new Date(args.data.end_date),
                }
            })
        },
        updateProject: async(parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                data: {
                    ...args.data,
                    ...(args.data.start_date && {
                        start_date: {
                            set: new Date(args.data.start_date.set),
                        }
                    }),
                    ...(args.data.end_date && {
                        end_date: {
                            set: new Date(args.data.end_date.set),
                        }
                    }),
                },
            })
        },
        setProjectLeader: async (parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                data: {
                    leader: {
                        connect: {
                          id: args.user
                        }
                      }
                }
            })
        },
        addProjectEmployee: async(parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                  data: {
                    employees: {
                        connect: {
                            id: args.employee
                      },
                    }
                  }
            })
        },
        removeProjectEmployee: async(parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                  data: {
                    employees: {
                        disconnect: {
                            id: args.employee
                      },
                    }
                  }
            })
        },
        changeProjectDepartment: async(parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                data: {
                    department: {
                        connect: {
                            id: args.changeToDepartmentId
                      }
                    }
                }
            })
        },
        deleteProject: async (parent,args) => {
            return await prisma.project.delete({
                where: { ...args.where },
            });
        }
    }
};

export {ProjectResolvers};