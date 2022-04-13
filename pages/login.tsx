import { signIn } from 'next-auth/react';
import React from 'react';

const login = () => (
  <div>
    <button
      type='button'
      onClick={() => {
        signIn('auth0');
      }}
    >
      {' '}
      Iniciar sesion.
    </button>
  </div>
);

export default login;
