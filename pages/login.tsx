import { signIn } from "next-auth/react";
import React from "react";

const login = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn("auth0");
        }}
      >
        {" "}
        Iniciar sesion.
      </button>
    </div>
  );
};

export default login;
