import NotAuthorized from "@components/NotAuthorized";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Loading from "react-loading";

export const PublicLayout = ({ pageAuth, children }: any) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    signIn("auth0");
    return <Loading />;
  }
  if (!pageAuth) {
    return <NotAuthorized />;
  }
  return (
    <div>
      <div className="flex flex-row items-center">
        <button
          className="bg-red-500 hover:bg-red-300 m-3 rounded-xl p-3 text-white"
          type="button"
          onClick={() => signOut()}
        >
          Cerrar Sesion
        </button>
        <h3 className="text-lg"> Bienvenido { session.user.name } !</h3>
      </div>
      {children}
    </div>
  );
};
