import { useQuery } from "@apollo/client";
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
      <Link href="/clients/new" passHref>
        <div className="self-end button-primary">Nuevo Cliente</div>
      </Link>

      <h2 className="my-4 text-3xl font-bold text-gray-800">Clientes</h2>
      <div className="hidden lg:block">
        <table>
          <thead>
            <th>ID Cliente</th>

            <th>Nombre</th>
            <th>Fecha de Actualización</th>
            <th>Fecha de Creación</th>

            <th>Acciones</th>
          </thead>
          <tbody>
            {/* {data.getProjects.map((c) => (
              <div key={c.id}>{c.id} = {c.name}</div>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
