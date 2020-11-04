import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';

export const AccountPage = () => {
  const { account } = useAuth();
  return (
    <>
      <h1>Account</h1>
      <Link to="/">Home</Link>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </>
  );
};
