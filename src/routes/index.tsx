import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Auth from '../pages/Auth';
import RegisterUser from '../pages/RegisterUser';
import Settings from '../pages/Settings';


const Routes: React.FC = () => {

  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/cadastro-usuario" component={RegisterUser} />
      <Route path="/dashboard" component={Dashboard} isPrivate={true} />
      <Route path="/import" component={Import} isPrivate={true} />
      <Route path="/configuracao" component={Settings} isPrivate={true} />
    </Switch>
  )
}

export default Routes;
