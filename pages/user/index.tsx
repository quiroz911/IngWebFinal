import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { matchRoles } from "utils/matchRoles";
import { Dialog } from "@mui/material";
import useFormData from "hooks/useFormData";
import { ButtonLoading } from "@components/ButtonLoading";
import { nanoid } from "nanoid";
import { CREATE_USER_ACCOUNT } from "graphql/mutations/user";
import { useMutation } from "@apollo/client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export async function getServerSideProps(context) {
  // const options: AxiosRequestConfig = {
  //   method: "POST",
  //   url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,
  //   data: {
  //     grant_type: "client_credentials",
  //     client_id: process.env.AUTH0_API_ID,
  //     client_secret: process.env.AUTH0_API_SECRET,
  //     audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
  //   },
  // };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,

    data: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_API_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
    },
  };

  const TokenResponse = await axios.request(options);
  const token = TokenResponse.data.access_token;

  // console.log(TokenResponse);

  return {
    props: { token, ...(await matchRoles(context)) },
  };
}

const Index = ({ token }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div className="flex flex-col">
      <Link href="/" passHref>
        <i className="fas fa-arrow-left self-start cursor-pointer m-5" />
      </Link>
      <h1 className="bg-yellow-400 p-6 text-2xl text-center">Gestion de usuarios</h1>
      <button
        onClick={() => setOpenDialog(true)}
        type="button"
        className=" bg-green-500 hover:bg-green-300 rounded-xl p-3 mx-28 my-10 text-white text-xl"
      >
        Crear nuevo usuario
      </button>
      <Link href="/user/table" passHref>
          <button className="bg-green-500 hover:bg-green-300 rounded-xl p-3 mx-28 my-8 text-white text-xl">
            Ver usuarios
          </button>
        </Link>
      <Dialog open={openDialog} onClose={closeDialog}>
        <CreateUserDialog closeDialog={closeDialog} token={token} />
      </Dialog>
      
    </div>
  );
};

const CreateUserDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT);

  const submitForm = async (e) => {
    e.preventDefault();
    const password = nanoid();
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://proyecto-final-ing-web.us.auth0.com/api/v2/users",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        email: formData.email,
        password: `${password}*`,
        connection: "Username-Password-Authentication",
        name: formData.name,
      },
    };
    try {
      const userCreateResponse = await axios.request(options);
      await createUser({
        variables: {
          data: {
            email: userCreateResponse.data.email,
            name: userCreateResponse.data.name,
            image: userCreateResponse.data.picture,
            auth0Id: userCreateResponse.data.user_id,
            role: formData.role,
          },
        },
      });
      console.log(password);
      toast.success(`Usuario creado correctamente con la clave ${password}`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error("Error creando el usuario");
      closeDialog();
    }
  };

  return (
    <div className="p-4">
      <form className="flex flex-col" ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <label htmlFor="email">
          <span className="mx-5"> Email</span>
          <input name="email" placeholder="Ingrese correo" required type={"email"} />
        </label>
        <label htmlFor="name">
          <span className="mx-5"> Nombre</span>
          <input name="name" placeholder="Ingrese nombre" required type={"text"} />
        </label>
        <label htmlFor="role" className="my-2">
          <span className="font-bold mx-2">Rol:</span>
          <select name="role" required>
            <option disabled selected>
              Seleccione un rol
            </option>
            <option>employee</option>
            <option>leader</option>
            <option>administrator</option>
          </select>
        </label>
        <ButtonLoading isSubmit text="Crear Usuario" loading={loading} />
      </form>
    </div>
  );
};

export default Index;
