import React from 'react';

import { useAuth } from './auth';

export const Wrapper = ({
  children,
}) => {
  const {
    isLoading: authIsLoading,
    error: authError,
  } = useAuth();

  if (authIsLoading) {
    return (
      <p>Loading...</p>
    );
  }

  if (authError) {
    return (
      <>
        <p>There was an error authenticating:</p>
        <pre>{JSON.stringify(authError, null, 2)}</pre>
      </>
    );
  }

  return children;
};
