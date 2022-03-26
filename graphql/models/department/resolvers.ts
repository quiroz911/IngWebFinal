import prisma from "config/prisma";
import { argsToArgsConfig } from "graphql/type/definition";


const DepartmentResolvers = {
    Department: {
        projects: async (parent, args) => {
            return await prisma.project.findMany({
                where: {
                    departmentId: parent.id
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
        /*Department: async (parent, args) => {
            return await prisma.user.findUnique({
                where: {
                    id: parent.departmentId,
                },
            });
        },*/
        employees: async (parent, args) => {
            return await prisma.user.findMany({
                where: {
                    departmentId: parent.id
                },
            });
        },
    },
    Query: {
        getDepartments: async (parent, args) => {
            return await prisma.department.findMany({});
        },
        getDepartment: async (parent, args) => {
            return await prisma.department.findUnique({
                where: { ...args.where },
            });
        },
        getDepartmentLeader: async (parent, args) => {
            return await prisma.user.findUnique({
                where: {
                    id: parent.id_leader
                },
            });
        },
    },
    Mutation: {
        createDepartment: async (parent, args) => {
            return await prisma.department.create({
                data:{
                    ...args.data,
                }
            })
        },
        updateDepartment: async(parent, args) => {
            return await prisma.department.update({
                where: { ...args.where },
                data: {
                    ...args.data,
                },
            })
        },
        deleteDepartment: async (parent,args) => {
            return await prisma.department.delete({
                where: { ...args.where },
            });
        }
    }
};

export {DepartmentResolvers};