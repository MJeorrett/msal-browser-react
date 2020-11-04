import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from './Routes';
import { AuthProvider } from './auth';
import { Wrapper } from './Wrapper';
import { appConfig } from './appConfig';

const App = () => {
  return (
    <Router>
      <AuthProvider
        tenantName={appConfig.authTenantName}
        signInPolicyName={appConfig.authSignInPolicyName}
        appBaseUrl={appConfig.appBaseUrl}
        appId={appConfig.authAppId}
        scope={appConfig.authPublishedScope}
      >
        <Wrapper>
          <Routes />
        </Wrapper>
      </AuthProvider>
    </Router>
  );
};

export default App;
