import React from "react";

export const PublicLayout = ({ children }: any) => {
  return (
    <div>
      {children}
      <div>este es el public layout</div>
    </div>
  );
};
