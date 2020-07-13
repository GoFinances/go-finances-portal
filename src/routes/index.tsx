import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Auth from '../pages/Auth';
import RegisterUser from '../pages/RegisterUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Auth} />
    <Route path="/login" component={Auth} />
    <Route path="/cadastro-usuario" component={RegisterUser} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
