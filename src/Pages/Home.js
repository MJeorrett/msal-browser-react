import React, { useState } from 'react';
import { useAuth } from '../auth';
import { appConfig } from '../appConfig';

export const HomePage = () => {
  const [accessTokenApi, setAccessTokenApi] = useState('');
  const {
    isAuthenticated,
    handleLogIn,
    handleLogOut,
    getAccessToken,
    account,
  } = useAuth();

  const handleGetAccessTokenApi = async () => {
    const token = await getAccessToken(appConfig.authPublishedScope);
    setAccessTokenApi(token);
  };

  return (
    <>
      <h1>Welcome to a Demo of @azure/msal-browser in React.</h1>
      {isAuthenticated ?
        (
          <button onClick={handleLogOut}>Log Out</button>
        ) :
        (
          <button onClick={handleLogIn}>Log In</button>
        )
      }
      <h2>Is Authenticated</h2>
      <p>{isAuthenticated ? 'Yes' : 'No'}</p>
      {isAuthenticated && (
        <>
          <h2>Account</h2>
          <pre>{JSON.stringify(account, null, 2)}</pre>
          <h2>Get Access Token Api</h2>
          <button onClick={handleGetAccessTokenApi}>Get Access Token</button>
          <pre>{accessTokenApi}</pre>
        </>
      )}
    </>
  )
};
