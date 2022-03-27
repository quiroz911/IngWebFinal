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
  return (
    <div>
      {children}
      <div>este es el public layout</div>
    </div>
  );
};
