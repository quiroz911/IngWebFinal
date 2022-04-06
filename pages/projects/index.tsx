import { useMutation, useQuery } from "@apollo/client";
import { ButtonLoading } from "@components/ButtonLoading";
import PrivateComponent from "@components/PrivateComponent";
import { Dialog } from "@mui/material";
import { EDIT_PROJECT } from "graphql/mutations/project";
import { GET_PROJECTS } from "graphql/queries/projects";
import useFormData from "hooks/useFormData";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
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
            <PrivateComponent roleList={["administrator"]}>
              <th>ID proyecto</th>
            </PrivateComponent>
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
                  {existeLeader(c.leader)}
                  <EditDeleteButtons project={c} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function existeLeader(leader) {
  if (leader) {
    return <td>{leader.name}</td>;
  } else {
    return <td>N/A</td>;
  }
}

const EditDeleteButtons = ({ project }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);
  const [openAddLeaderDialog, setOpenAddLeaderDialog] = useState(false);
  const closeDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenAddMemberDialog(false);
    setOpenAddLeaderDialog(false);
  };
  return (
    <div>
      <div className="flex w-full justify-center">
        <button
          type="button"
          onClick={() => {
            setOpenEditDialog(true);
          }}
        >
          <i className="mx-4 fas fa-pen text-yellow-500 hover:text-yellow-700 cursor-pointer" />
        </button>
        <button type="button" onClick={() => setOpenDeleteDialog(true)}>
          <i className="mx-4 fas fa-trash text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
        <button type="button" onClick={() => setOpenAddMemberDialog(true)}>
          <i className="mx-4 fa fa-user-plus text-green-500 hover:text-green-700 cursor-pointer" />
          <span>Member</span>
        </button>
        <button type="button" onClick={() => setOpenAddLeaderDialog(true)}>
          <i className="mx-4 fa fa-user-plus text-purple-500 hover:text-purple-700 cursor-pointer" />
          <span>Leader</span>
        </button>
      </div>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <EditProyecto project={project} closeDialog={closeDialog} />
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        {/* <DeleteProyecto project={project} closeDialog={closeDialog} /> */}
      </Dialog>
      <Dialog open={openAddMemberDialog} onClose={closeDialog}>
        {/* <DeleteProyecto project={project} closeDialog={closeDialog} /> */}
      </Dialog>
      <Dialog open={openAddLeaderDialog} onClose={closeDialog}>
        {/* <DeleteProyecto project={project} closeDialog={closeDialog} /> */}
      </Dialog>
    </div>
  );
};

const EditProyecto = ({ project, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [updateProject, { loading }] = useMutation(EDIT_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await updateProject({
      variables: {
        where: {
          set: project.id
        },
        data: {
          name: formData.name,
          start_date: formData.start_date,
          end_date: formData.end_date
        },
      },
    });
    toast.success(`proyecto ${project.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
        Editar Cliente
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <label htmlFor='name' className='flex flex-col'>
          <span>Nombre del Cliente:</span>
          <input name='name' className="m-3 border-2" defaultValue={project.name} />
        </label>
        <label htmlFor='start_date' className='flex flex-col'>
          <span>Fecha inicio</span>
          <input type="date" name='start_date' defaultValue={project.start_date} />
        </label>
        <label htmlFor='end_date' className='flex flex-col'>
          <span>Fecha inicio</span>
          <input type="date" name='end_date' defaultValue={project.end_date} />
        </label>
        <ButtonLoading isSubmit loading={loading} text='Editar Cliente' />
      </form>
    </div>
  );
};


export default index;
