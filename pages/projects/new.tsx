import { useRouter } from 'next/router';
import React from 'react';
import useFormData from 'hooks/useFormData';
import { CREATE_PROJECT } from 'graphql/mutations/project';
import { GET_PROJECTS } from 'graphql/queries/projects';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ButtonLoading } from '@components/ButtonLoading';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const NewProject = () => {
  const router = useRouter();
  const { form, formData, updateFormData } = useFormData(null);
  const [createProject, { data, loading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });

  const submitForm = async (e) => {
    e.preventDefault();

    await createProject({
      variables: {
        data: {
          name: formData.name,
          start_date: formData.start_date,
          end_date: formData.end_date,
        },
      },
    });
    toast.success('Proyecto creado con éxito');
    router.push('/projects');
    // form.current.reset();
  };
  return (
    <div className='flex flex-col items-center p-10'>
      {data && <div>data loaded</div>}
      <Link href='/projects' passHref>
        <i className='fas fa-arrow-left self-start' />
      </Link>
      <h2 className='text-bold text-3xl'>Nuevo Proyecto</h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col my-4'
      >
        <label className='flex flex-col' htmlFor='name'>
          <span>Nombre del Proyecto</span>
          <input
            name='name'
            type='text'
            className='rounded-xl my-3 text-center border-2 border-slate-700'
          />
          <span>Fecha de inicio</span>
          <input
            name='start_date'
            type='date'
            className='rounded-xl my-3 text-center border-2 border-slate-700'
          />
          <span>fecha de finalización</span>
          <input
            name='end_date'
            type='date'
            className='rounded-xl my-3 text-center border-2 border-slate-700'
          />
        </label>
        <ButtonLoading isSubmit loading={loading} text='Crear Proyecto' />
      </form>
    </div>
  );
};

export default NewProject;
