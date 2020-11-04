export const appConfig = {
  authTenantName: process.env.REACT_APP_AUTH_TENANT_NAME,
  authSignInPolicyName: process.env.REACT_APP_AUTH_SIGN_IN_POLICY_NAME,
  authAppId: process.env.REACT_APP_AUTH_APP_ID,
  authPublishedScope: process.env.REACT_APP_AUTH_PUBLISHED_SCOPE,
  appBaseUrl: process.env.REACT_APP_BASE_URL,
};

class AuthConfigError extends Error {}

if (!appConfig.authTenantName) throw new AuthConfigError('"authTenantName" parameter missing in environment.');
if (!appConfig.authSignInPolicyName) throw new AuthConfigError('"authSignInPolicyName" parameter missing in environment.');
if (!appConfig.appBaseUrl) throw new AuthConfigError('"appBaseUrl" parameter missing in environment.');
if (!appConfig.authAppId) throw new AuthConfigError('"appId" parameter missing in environment.');
if (!appConfig.authPublishedScope) throw new AuthConfigError('"publishedScope" parameter missing in environment.');