import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import Link from "next/link";
import { Dialog } from "@mui/material";
import useFormData from "hooks/useFormData";

import { toast } from "react-toastify";
import { ButtonLoading } from "@components/ButtonLoading";
import PrivateComponent from "@components/PrivateComponent";
import { matchRoles } from "utils/matchRoles";
import { GET_USERS } from "graphql/queries/users";
import { DELETE_USER, EDIT_USER } from "graphql/mutations/user";
// import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Indexusers = () => {
  const { data, loading } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Loading....</div>;

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="my-4 text-3xl font-bold text-gray-800">USUARIOS</h2>
      <div className="hidden lg:block">
        <table>
          <thead>
            <PrivateComponent roleList={["administrator"]}>
              <th>ID users</th>
            </PrivateComponent>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Fecha de Actualización</th>
            <th>Fecha de Creación</th>
            <PrivateComponent roleList={["administrator"]}>
              <th>Acciones</th>
            </PrivateComponent>
          </thead>
          <tbody>
            {data.getUsers.map((c) => (
              <Users key={c.id} user={c} />
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className=" ">
        <userssResponsive users={data.getUsers} />
      </div> */}
    </div>
  );
};

// const userssResponsive = ({ users }) => (
//   <div>
//     {users.map((user) => (
//       <usersResponisve key={user.id} user={user} />
//     ))}
//   </div>
// );

const UsersResponisve = ({ user }) => (
  <div className="bg-gray-200 flex flex-col my-4 p-4 rounded-lg shadow-lg">
    <div className="flex flex-col">
      <span>Nombre:</span>
      <span>{user.name}</span>
    </div>
    <div>
      <EditDeleteButtons user={user} />
    </div>
  </div>
);

const Users = ({ user }) => (
  <tr>
    <PrivateComponent roleList={["administrator"]}>
      <td>{user.id}</td>

      <td>{user.name}</td>
      <td>{user.role.name}</td>
      <td>{user.updatedAt}</td>
      <td>{user.createdAt}</td>
      <td>
        <EditDeleteButtons user={user} />
      </td>
    </PrivateComponent>
  </tr>
);

const EditDeleteButtons = ({ user }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const closeDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
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
      </div>
      <Dialog open={openEditDialog} onClose={closeDialog}>
        <Editusers user={user} closeDialog={closeDialog} />
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <Deleteusers user={user} closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const Editusers = ({ user, closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [updateuser, { loading }] = useMutation(EDIT_USER, {
    refetchQueries: [GET_USERS],
  });
  const submitForm = async (e) => {
    e.preventDefault();
    await updateuser({
      variables: {
        updateuserId: user.id,
        name: formData.name,
      },
    });
    toast.success(`users ${user.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="my-3 text-2xl font-extrabold text-gray-900">
        Editar users
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <label htmlFor="name" className="flex flex-col">
          <span>Nombre del users:</span>
          <input name="name" defaultValue={user.name} />
        </label>
        <ButtonLoading isSubmit loading={loading} text="Editar users" />
      </form>
    </div>
  );
};

const Deleteusers = ({ user, closeDialog }) => {
  const [deleteuser, { loading }] = useMutation(DELETE_USER, {
    refetchQueries: [GET_USERS],
  });
  const cancel = () => {
    closeDialog();
  };
  const deleteFunction = async () => {
    await deleteuser({
      variables: {
        deleteuserId: user.id,
      },
    });
    toast.success("users eliminado con éxito");
    closeDialog();
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="text-2xl text-gray-900 font-extrabold my-3">
        Eliminar users
      </h2>
      <span className="text-red-500 font-bold my-2">
        Esta acción no se puede deshacer.
      </span>
      <span className="my-2">¿Está seguro de que desea eliminar el users?</span>
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

export default Indexusers;
