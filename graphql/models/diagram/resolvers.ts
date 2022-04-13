import prisma from "config/prisma";
import { argsToArgsConfig } from "graphql/type/definition";


const EmployeesDiagramResolvers = {
    Query: {
        getDiagramData: async (parent, args) => {
            const dataProject = await prisma.project.findMany({
                include: {
                    employees: true
                }
            });
            var numEmploy = [];
            var nomProj = [];
            dataProject.forEach(item => {
                numEmploy.push(item.employees.length);
                nomProj.push(item.name);
            })
            const data = {
                series:[
                {
                    name: 'Cantidad de empleados',
                    data: numEmploy,
                },
                ],
                categories: nomProj,
            }
            return data;
        },
    },
};

export {EmployeesDiagramResolvers};