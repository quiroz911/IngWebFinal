import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react'

const index = () => {
    // const { data, loading } = useQuery(GET_CLIENTES, {
    //     fetchPolicy: 'cache-and-network',
    //   });
      
  return (
    <div className='flex flex-col items-center p-10'>
      
        <Link href='/clients/new' passHref>
          <div className='self-end button-primary'>Nuevo Cliente</div>
        </Link>
  
      <h2 className='my-4 text-3xl font-bold text-gray-800'>Clientes</h2>
      <div className='hidden lg:block'>
        <table>
          <thead>
          
              <th>ID Cliente</th>
          
            <th>Nombre</th>
            <th>Fecha de Actualización</th>
            <th>Fecha de Creación</th>
           
              <th>Acciones</th>
           
          </thead>
          <tbody>
            {/* {data.getClients.map((c) => (
              <Cliente key={c.id} client={c} />
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default index

