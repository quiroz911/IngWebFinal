import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { matchRoles } from "utils/matchRoles";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Home: NextPage = () => {
  return <div className="bg-red-500">hola mundox</div>;
};

export default Home;
