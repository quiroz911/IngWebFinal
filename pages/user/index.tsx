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

const index = () => {};

export default index;
