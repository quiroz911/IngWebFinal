import { useMutation } from "@apollo/client";
import { ButtonLoading } from "@components/ButtonLoading";
import { CREATE_DEPARTMENT } from "graphql/mutations/department";
import { GET_DEPARTMENTS } from "graphql/queries/departments";
import useFormData from "hooks/useFormData";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import { matchRoles } from "utils/matchRoles";

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const newDepartment = () => {
  const router = useRouter();
  const { form, formData, updateFormData } = useFormData(null);
  const [createDepartment, { data, loading }] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [GET_DEPARTMENTS],
  });

  const submitForm = async (e) => {
    e.preventDefault();

    await createDepartment({
      variables: {
        data: {
          name: formData.name,
          departmentLeaderId: formData.leaderId
        },
      },
    });
    toast.success("Proyecto creado con éxito");
    router.push("/departments");
    // form.current.reset();
  };
  return (
    <div className="flex flex-col items-center p-10">
      {data && <div>data loaded</div>}
      <Link href="/departments" passHref>
        <i className="fas fa-arrow-left self-start" />
      </Link>
      <h2 className="text-bold text-3xl">Nuevo Departamento</h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col my-4"
      >
        <label className="flex flex-col" htmlFor="name">
          <span>Nombre del Departamento</span>
          <input
            name="name"
            type="text"
            className="rounded-xl my-3 text-center border-2 border-slate-700"
          />
          <span>Id del Líder</span>
          <input
            name="leaderId"
            type="text"
            className="rounded-xl my-3 text-center border-2 border-slate-700"
          />
        </label>
        <ButtonLoading isSubmit loading={loading} text="Crear Departamento" />
      </form>
    </div>
  );
};

export default newDepartment;
