import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHome from './PageHome';
import UsersSwitch from './UsersSwitch';
import PageSignup from './PageSignup';
import Login from './Login';
import SelectComp from './test';
import PageSearch from './PageSearch';
import Logout from './Logout';
import Authenticate from './Authenticate';
import Profile from './Profile';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/test' component={SelectComp}/>
      <Route exact path='/' component={PageHome}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/logout' component={Logout}/>
      <Route exact path='/search' component={Authenticate(PageSearch)}/>
      <Route exact path='/signup' component={PageSignup}/>
      <Route path='/profile' component={Authenticate(Profile)}/>
      <Route path='/users' component={Authenticate(UsersSwitch)}/>
    </Switch>
  </main>
);

export default Main;