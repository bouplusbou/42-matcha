import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticate from './Authenticate';
import User from './User';

// The UserSwitch component matches one of two different routes
// depending on the full pathname
const UsersSwitch = () => (
  <Switch>
    <Route path='/users/:id' component={Authenticate(User)}/>
    {/* <Route path='/users/:id' component={User}/> */}
  </Switch>
);

export default UsersSwitch;