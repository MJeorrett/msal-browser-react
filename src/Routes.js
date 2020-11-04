import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Pages from './Pages';
import { Wrapper } from './Wrapper';

export const Routes = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/">
          <Pages.HomePage />
        </Route>
        <Route path="/account">
          <Pages.AccountPage />
        </Route>
      </Switch>
    </Wrapper>
  );
};
