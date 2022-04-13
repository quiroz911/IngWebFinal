import { useMutation, useQuery } from "@apollo/client";
import { ButtonLoading } from "@components/ButtonLoading";
import PrivateComponent from "@components/PrivateComponent";
import { Dialog } from "@mui/material";
import {
  DELETE_DEPARTMENT,
  EDIT_DEPARTMENT,
} from "graphql/mutations/department";
import { GET_DEPARTMENTS } from "graphql/queries/departments";
import useFormData from "hooks/useFormData";
import Link from "next/link";
import { ExisteLeader } from "pages/projects";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { matchRoles } from "utils/matchRoles";

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Index = () => {
  const { data, loading } = useQuery(GET_DEPARTMENTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center p-10">
      <Link href="/" passHref>
        <i className="fas fa-arrow-left self-start cursor-pointer" />
      </Link>
      <PrivateComponent roleList={["administrator"]}>
        <Link href="/departments/new" passHref>
          <div className="self-end button-primary">Nuevo Departamento</div>
        </Link>
      </PrivateComponent>

      <h2 className="my-4 text-3xl font-bold text-gray-800">Departamentos</h2>
      <div className="hidden lg:block">
        <table>
          <thead>
            <PrivateComponent roleList={["administrator"]}>
              <th>ID Departamento</th>
            </PrivateComponent>
            <th>Nombre</th>
            <th>Empleados</th>
            <PrivateComponent roleList={["administrator", "leader"]}>
              <th>Líder departamento</th>
            </PrivateComponent>
            <th>Proyectos</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            {data.getDepartments.map((c) => {
              return (
                <tr key={c.id}>
                  <PrivateComponent roleList={["administrator"]}>
                    <td>{c.id}</td>
                  </PrivateComponent>
                  <td>{c.name}</td>
                  <td key={c.id} className="flex flex-col">
                    {c.employees.map((e) => {
                      return <p>•{e.name}</p>;
                    })}
                  </td>
                  <PrivateComponent roleList={["administrator", "leader"]}>
                    <ExisteLeader leader={c.leader} />
                  </PrivateComponent>
                  <td key={c.id} className="flex flex-col">
                    {c.projects.map((e) => {
                      return <p>•{e.name}</p>;
                    })}
                  </td>
                  <EditDeleteButtons department={c} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditDeleteButtons = ({ department }) => {
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
      </div>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <EditDepartamento department={department} closeDialog={closeDialog} />
      </Dialog>

      <PrivateComponent roleList={["administrator"]}>
        <Dialog open={openDeleteDialog} onClose={closeDialog}>
          <DeleteDepartamento
            department={department}
            closeDialog={closeDialog}
          />
        </Dialog>
      </PrivateComponent>
    </td>
  );
};

const EditDepartamento = ({ department, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [updateDepartment, { loading }] = useMutation(EDIT_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await updateDepartment({
      variables: {
        where: {
          id: department.id,
        },
        data: {
          name: formData.name,
        },
      },
    });
    toast.success(`proyecto ${department.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="my-3 text-2xl font-extrabold text-gray-900">
        Editar departamento
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <label htmlFor="name" className="flex flex-col">
          <span>Nombre del Departamento:</span>
          <input
            name="name"
            className="m-3 border-2"
            defaultValue={department.name}
          />
        </label>
        <ButtonLoading isSubmit loading={loading} text="Editar Departamento" />
      </form>
    </div>
  );
};

const DeleteDepartamento = ({ department, closeDialog }) => {
  const [deleteProject, { loading }] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });
  const cancel = () => {
    closeDialog();
  };
  const deleteFunction = async () => {
    await deleteProject({
      variables: {
        where: {
          id: department.id,
        },
      },
    });
    toast.success("Proyecto eliminado con éxito");
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="text-2xl text-gray-900 font-extrabold my-3">
        Eliminar Departamento
      </h2>
      <span className="text-red-500 font-bold my-2">
        Esta acción no se puede deshacer.
      </span>
      <span className="my-2">
        ¿Está seguro de que desea eliminar el Departamento?
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

export default Index;
