import prisma from "config/prisma";


const ProjectResolvers = {
    Query:{
        getProjects: async (parent, args) => {
            return await prisma.project.findMany();
        },
    },
    /*Mutation:{
        createProject: async (parent, args) => {
            const newProject = await prisma.project.create({
                data: {
                    args.name,
                    args.start_date,
                    args.end_date,

                },
            });
            return newProject;
        },
    },*/

};

export {ProjectResolvers};