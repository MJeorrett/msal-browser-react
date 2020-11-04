import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <>
            <button onClick={handleLogOut}>Log Out</button><br />
            <Link to="/account">View Account</Link>
          </>
        ) :
        (
          <button onClick={handleLogIn}>Log In</button>
        )
      }
      {isAuthenticated && (
        <>
          <h2>Get Access Token Api</h2>
          <button onClick={handleGetAccessTokenApi}>Get Access Token</button>
          <pre>{accessTokenApi}</pre>
        </>
      )}
    </>
  )
};
