import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROFILE } from 'graphql/queries/users';
import useFormData from 'hooks/useFormData';
import { UPDATE_IMAGE, UPSERT_PROFILE } from 'graphql/mutations/profile';
import FileUpload from '@components/FileUpload';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@components/ButtonLoading';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Index = () => {
  const { data: session } = useSession();
  const { data, loading: userLoading } = useQuery(GET_PROFILE, {
    variables: {
      email: session.user.email,
    },
  });
  const { form, formData, updateFormData } = useFormData(null);
  const [upsertProfile, { loading }] = useMutation(UPSERT_PROFILE, {
    refetchQueries: [GET_PROFILE],
  });
  const [updateImage] = useMutation(UPDATE_IMAGE, {
    refetchQueries: [GET_PROFILE],
  });

  const updateProfilePicture = async (url) => {
    await updateImage({
      variables: {
        where: {
          id: data.getUser.id,
        },
        image: url,
      },
    });
    toast.success('Profile Picture updated successfully');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await upsertProfile({
      variables: {
        where: {
          id: data.getUser.id,
        },
        data: {
          phone: formData.phone,
          address: formData.address,
          customImage: formData.profileImage,
        },
      },
    });
    toast.success('Profile updated successfully');
  };

  if (userLoading) return <div>Loading...</div>;

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-10'>
      <h1 className='text-2xl font-bold text-gray-900 my-2'>User Profile</h1>
      <form
        className='flex flex-col my-2 w-full'
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
      >
        <div className='flex flex-col items-center'>
          <Image
            className='rounded-full '
            src={data.getUser.profile?.customImage ?? data.getUser.image}
            height={120}
            width={120}
            alt='user-profile'
          />
          <div className='my-4'>
            <FileUpload
              name='profileImage'
              type='image'
              text='Change'
              onSuccess={updateProfilePicture}
            />
          </div>
        </div>
        <hr />

        <div className='grid grid-cols-2 gap-5 my-3'>
          <label htmlFor='email' className='flex flex-col'>
            <span>Email</span>
            <input
              type='email'
              name='email'
              defaultValue={data.getUser.email}
              disabled
            />
          </label>
          <label htmlFor='username' className='flex flex-col'>
            <span>User Name</span>
            <input
              type='username'
              name='username'
              defaultValue={data.getUser.name}
              disabled
            />
          </label>
          <label htmlFor='phone' className='flex flex-col'>
            <hr />
            <span>Phone</span>
            <input
              type='phone'
              name='phone'
              defaultValue={data.getUser.profile?.phone ?? ''}
              className='rounded-lg border-slate-800 border-2'
            />
          </label>
          <label htmlFor='address' className='flex flex-col'>
            <hr />
            <span>Address</span>
            <input
              type='address'
              name='address'
              defaultValue={data.getUser.profile?.address ?? ''}
              className='rounded-lg border-slate-800 border-2'
            />
          </label>
        </div>

        <div className='w-full flex justify-center'>
          <ButtonLoading loading={loading} text='Update Profile' isSubmit />
        </div>
      </form>
    </div>
  );
};

export default Index;
