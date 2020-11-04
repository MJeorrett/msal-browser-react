import React from 'react';

export const AuthErrorPage = ({
  error,
}) => {
  return (
    <>
      <h1>Sorry there was an error authenticating you:</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  )
}