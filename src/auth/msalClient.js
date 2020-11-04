import * as msal from '@azure/msal-browser';

export const createMsalClient = ({
  tenantName,
  signInPolicyName,
  appId,
  appBaseUrl
}) => {
  const msalConfig = {
    auth: {
      authority: `https://${tenantName}.b2clogin.com/tfp/${tenantName}.onmicrosoft.com/${signInPolicyName}`,
      clientId: appId,
      redirectUri: `${appBaseUrl}/`,
      knownAuthorities: [`${tenantName}.b2clogin.com`],
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };

  return new msal.PublicClientApplication(msalConfig);
}

