import PrivateComponent from "@components/PrivateComponent";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { matchRoles } from "utils/matchRoles";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Home: NextPage = () => {
  return (
    <div>
      <h2 className="text-3xl text-center font-bold ">Gestión de proyectos</h2>
      <div className="flex flex-row justify-center my-10">
      <PrivateComponent roleList={["administrator"]}>
        <Link href="/user" passHref>
          <button className="bg-blue-500 hover:bg-blue-300 rounded-xl px-3 py-2 m-6 text-white text-xl">
            Usuarios
          </button>
        </Link>
      </PrivateComponent>
        <Link href="/projects" passHref>
          <button className="bg-blue-500 hover:bg-blue-300 rounded-xl px-3 py-2 m-6 text-white text-xl">
            Proyectos
          </button>
        </Link>
        <Link href="/departments" passHref>
          <button className="bg-blue-500 hover:bg-blue-300 rounded-xl px-3 py-2 m-6 text-white text-xl">
            Departamentos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
