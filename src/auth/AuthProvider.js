import React, { createContext, useEffect, useState } from 'react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { createMsalClient } from './msalClient';

const initialValueForHintingTypes = {
  account: {},
  userName: '',
  isLoading: true,
  isAuthenticated: false,
  error: '',
  handleLogIn: () => undefined,
  handleLogOut: () => undefined,
  getAccessToken: () => new Promise<string>(''),
};
export const AuthContext = createContext(initialValueForHintingTypes);

export const AuthProvider = ({
  tenantName,
  signInPolicyName,
  appId,
  appBaseUrl,
  scope,
  children,
}) => {
  const [msalClient] = useState(() => createMsalClient({
    tenantName,
    signInPolicyName,
    appId,
    appBaseUrl,
  }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await msalClient.handleRedirectPromise();
        console.log('Handle redirect promise response:', response);
      }
      catch (error) {
        console.log('Error handling redirect:', error);
        setIsLoading(false);
        setError(error);
      }

      const accounts = msalClient.getAllAccounts();
      console.log('Loaded accounts:', accounts);
      const isAuthenticated = accounts.length > 0;

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        setAccount(accounts[0]);
      }
      setIsLoading(false);
    };

    load();
  }, [msalClient]);

  const handleLogIn = async () => {
    try {
      msalClient.loginRedirect({
        // Shouldn't have to include the published scope here but we do due to this: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2315#issuecomment-699194448
        scopes: [
          "openid",
          "offline_access",
          scope,
        ],
      });
    }
    catch (error) {
      console.error('Error logging in:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    try {
      msalClient.logout();
    }
    catch (error) {
      console.error('Error logging out:', error);
      setError(error);
      setIsLoading(false);
    }
  }

  const acquireAccessTokenRedirect = async acquireTokenRequest => {
    try {
      await msalClient.acquireTokenRedirect(acquireTokenRequest);
    }
    catch (error) {
      console.error('Error acquiring access token with redirect:', error);
    }
  }

  const handleAcquireAccessTokenError = async (error, acquireTokenRequest) => {
    if (error instanceof InteractionRequiredAuthError) {
      console.log('Interaction required.');
      acquireAccessTokenRedirect(acquireTokenRequest);
      return;
    }

    console.error('Error getting access token:', error);
    throw error;
  }

  const getAccessToken = async (scope) => {
    const acquireTokenRequest = {
      account,
      scopes: ['offline_access', scope],
    };
    try {
      const result = await msalClient.acquireTokenSilent(acquireTokenRequest);

      console.log('Get Access Token result:', result);

      return result.accessToken;
    }
    catch (error) {
      console.error("acquireTokenSilent failed with error:", error);
      return handleAcquireAccessTokenError(error, acquireTokenRequest)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        isLoading,
        isAuthenticated,
        error,
        handleLogIn,
        handleLogOut,
        getAccessToken,
        userName: account ? account.name : '',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}