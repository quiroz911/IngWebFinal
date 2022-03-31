import { useQuery } from "@apollo/client";
import PrivateComponent from "@components/PrivateComponent";
import { GET_PROJECTS } from "graphql/queries/projects";
import Link from "next/link";
import React from "react";
import { matchRoles } from "utils/matchRoles";

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const index = () => {
  const { data, loading } = useQuery(GET_PROJECTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center p-10">
      <PrivateComponent roleList={["administrator"]}>
        <Link href="/projects/new" passHref>
          <div className="self-end button-primary">Nuevo Proyecto</div>
        </Link>
      </PrivateComponent>

      <h2 className="my-4 text-3xl font-bold text-gray-800">Proyectos</h2>
      <div className="hidden lg:block">
        <table>
          <thead>
            <th>ID proyecto</th>
            <th>Nombre</th>
            <th>Fecha de inicio</th>
            <th>Fecha de finalización</th>
            <th>Empleados</th>
            <th>Líder proyecto</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {data.getProjects.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.start_date}</td>
                  <td>{c.end_date}</td>
                  <td className="flex flex-col">
                    {c.employees.map((e) => {
                      return <span>•{e.name}</span>;
                    })}
                  </td>
                  <td>{c.leader.name}</td>
                  <td> #acciones_por_crear </td>
                </tr>
                // <div key={c.id}>{c.id} = {c.name}</div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
