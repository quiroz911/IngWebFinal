import prisma from "config/prisma";
import { argsToArgsConfig } from "graphql/type/definition";


const ProjectResolvers = {
    Query: {
        getProjects: async (parent, args) => {
            return await prisma.project.findMany({});
        },
        getProject: async (parent, args) => {
            return await prisma.project.findUnique({
                where: {
                    id: args.id,
                },
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
        addProjectEmployee: async(parent, args) => {
            return await prisma.project.update({
                where: { ...args.where },
                data: {
                    employees: {
                        connect: {
                            id: "cl12znfi50032fcvbhn867m81"
                        }
                    }
                },
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