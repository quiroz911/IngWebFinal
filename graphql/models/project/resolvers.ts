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
                    name:args.data.name,
                    start_date:args.data.start_date,
                    end_date:args.data.end_date,
                    id_leader:args.data.id_leader,
                }
            })
        }
    }
};

export {ProjectResolvers};