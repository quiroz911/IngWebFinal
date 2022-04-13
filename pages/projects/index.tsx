import { useMutation, useQuery } from "@apollo/client";
import { ButtonLoading } from "@components/ButtonLoading";
import PrivateComponent from "@components/PrivateComponent";
import { Dialog } from "@mui/material";
import {
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_MEMBER_PROJECT,
  DELETE_MEMBER_PROJECT,
  SET_PROJECT_LEADER,
} from "graphql/mutations/project";
import { GET_PROJECTS } from "graphql/queries/projects";
import useFormData from "hooks/useFormData";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { matchRoles } from "utils/matchRoles";
import EmployeesDiagram from "./employeesDiagram";

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
      <Link href="/" passHref>
        <i className="fas fa-arrow-left self-start cursor-pointer" />
      </Link>
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
            <PrivateComponent roleList={["administrator", "leader"]}>
              <th>Líder proyecto</th>
            </PrivateComponent>
            <th>Acciones</th>
          </thead>
          <tbody>
            {data.getProjects.map((c) => {
              return (
                <tr key={c.id}>
                  <PrivateComponent roleList={["administrator"]}>
                    <td>{c.id}</td>
                  </PrivateComponent>
                  <td>{c.name}</td>
                  <td>{c.start_date.split("T").shift()}</td>
                  <td>{c.end_date.split("T").shift()}</td>
                  <td className="flex flex-col">
                    {c.employees.map((e) => {
                      return <p>•{e.name}</p>;
                    })}
                  </td>
                  <PrivateComponent roleList={["administrator", "leader"]}>
                  <ExisteLeader leader={c.leader}/>
                  </PrivateComponent>
                  <EditDeleteButtons project={c} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <EmployeesDiagram />
    </div>
  );
};

const ExisteLeader = ({leader}) =>{
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
    <td>
      <div className="flex w-full justify-center">
        <button
          type="button"
          onClick={() => {
            setOpenEditDialog(true);
          }}
        >
          <i className="mx-4 fas fa-pen text-yellow-500 hover:text-yellow-700 cursor-pointer" />
        </button>
        <PrivateComponent roleList={["administrator"]}>
          <button type="button" onClick={() => setOpenDeleteDialog(true)}>
            <i className="mx-4 fas fa-trash text-red-500 hover:text-red-700 cursor-pointer" />
          </button>
        </PrivateComponent>
        <PrivateComponent roleList={["administrator", "leader"]}>
          <button
            type="button"
            className="flex flex-col mx-1"
            onClick={() => setOpenAddMemberDialog(true)}
          >
            <i className="mx-4 fa fa-users text-green-500 hover:text-green-700 cursor-pointer" />
            <span>Member</span>
          </button>
        </PrivateComponent>
        <button
          type="button"
          className="flex flex-col mx-1"
          onClick={() => setOpenAddLeaderDialog(true)}
        >
          <i className="mx-4 fa fa-user-circle text-purple-500 hover:text-purple-700 cursor-pointer" />
          <span>Leader</span>
        </button>
      </div>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <EditProyecto project={project} closeDialog={closeDialog} />
      </Dialog>

      <PrivateComponent roleList={["administrator"]}>
        <Dialog open={openDeleteDialog} onClose={closeDialog}>
          <DeleteProyecto project={project} closeDialog={closeDialog} />
        </Dialog>
      </PrivateComponent>

      <PrivateComponent roleList={["administrator", "leader"]}>
        <Dialog open={openAddMemberDialog} onClose={closeDialog}>
          <EditProjectMember project={project} closeDialog={closeDialog} />
        </Dialog>
      </PrivateComponent>

      <Dialog open={openAddLeaderDialog} onClose={closeDialog}>
        <EditProjectLeader project={project} closeDialog={closeDialog} />
      </Dialog>
    </td>
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
          id: project.id,
        },
        data: {
          name: {
            set: formData.name,
          },
          start_date: {
            set: formData.start_date,
          },
          end_date: {
            set: formData.end_date,
          },
        },
      },
    });
    toast.success(`proyecto ${project.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="my-3 text-2xl font-extrabold text-gray-900">
        Editar Cliente
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <label htmlFor="name" className="flex flex-col">
          <span>Nombre del Proyecto:</span>
          <input
            name="name"
            className="m-3 border-2"
            defaultValue={project.name}
          />
        </label>
        <label htmlFor="start_date" className="flex flex-col">
          <span>Fecha inicio</span>
          <input
            type="date"
            name="start_date"
            defaultValue={project.start_date.split("T").shift()}
          />
        </label>
        <label htmlFor="end_date" className="flex flex-col mb-4">
          <span>Fecha final</span>
          <input
            type="date"
            name="end_date"
            defaultValue={project.end_date.split("T").shift()}
          />
        </label>
        <ButtonLoading isSubmit loading={loading} text="Editar Cliente" />
      </form>
    </div>
  );
};

const DeleteProyecto = ({ project, closeDialog }) => {
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const cancel = () => {
    closeDialog();
  };
  const deleteFunction = async () => {
    await deleteProject({
      variables: {
        where: {
          id: project.id,
        },
      },
    });
    toast.success("Proyecto eliminado con éxito");
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="text-2xl text-gray-900 font-extrabold my-3">
        Eliminar Proyecto
      </h2>
      <span className="text-red-500 font-bold my-2">
        Esta acción no se puede deshacer.
      </span>
      <span className="my-2">
        ¿Está seguro de que desea eliminar el Proyecto?
      </span>
      <div className="flex my-2">
        <ButtonLoading
          isSubmit={false}
          onClick={deleteFunction}
          loading={loading}
          text="Confirmar"
        />
        <button
          type="button"
          className="button-secondary mx-2"
          onClick={cancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

const EditProjectMember = ({ project, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [addProjectEmployee, { loading }] = useMutation(ADD_MEMBER_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const [removeProjectEmployee] = useMutation(DELETE_MEMBER_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await addProjectEmployee({
      variables: {
        where: {
          id: project.id,
        },
        employeeEmail: formData.email,
      },
    });
    toast.success(`miembro del proyecto ${project.id} agregado exitosamente`);
    closeDialog();
  };
  const deleteMember = async () => {
    await removeProjectEmployee({
      variables: {
        where: {
          id: project.id,
        },
        employeeEmail: formData.email,
      },
    });
    toast.success(`miembro del proyecto ${project.id} eliminado exitosamente`);
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="my-3 text-2xl font-extrabold text-gray-900">
        Editar Miembro
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <label htmlFor="email" className="flex flex-col">
          <span>Correo del usuario</span>
          <input name="email" className="m-3 border-2" />
        </label>
        <div className="flex ">
          <ButtonLoading isSubmit loading={loading} text="Agregar Miembro" />
          <span className="mx-2"> | </span>
          <ButtonLoading
            isSubmit={false}
            onClick={deleteMember}
            loading={loading}
            text="Eliminar Miembro"
          />
        </div>
      </form>
    </div>
  );
};

const EditProjectLeader = ({ project, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [setProjectLeader, { loading }] = useMutation(SET_PROJECT_LEADER, {
    refetchQueries: [GET_PROJECTS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await setProjectLeader({
      variables: {
        where: {
          id: project.id,
        },
        userEmail: formData.email,
      },
    });
    toast.success(`miembro del proyecto ${project.id} agregado exitosamente`);
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="my-3 text-2xl font-extrabold text-gray-900">
        Editar líder
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <label htmlFor="email" className="flex flex-col">
          <span>Correo del usuario</span>
          <input name="email" className="m-3 border-2" />
        </label>
        <div className="flex ">
          <ButtonLoading
            isSubmit
            loading={loading}
            text="Asignar líder de proyecto"
          />
        </div>
      </form>
    </div>
  );
};

export default index;
export {ExisteLeader};