import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHome from './PageHome';
import UsersSwitch from './UsersSwitch';
import PageSignup from './PageSignup/PageSignup';
import PageLogin from './PageLogin/PageLogin';
import SelectComp from './test';
import PageSearch from './PageSearch/PageSearch';
import PageMatcher from './PageMatcher/PageMatcher';
import Authenticate from './Authenticate';
import Profile from './PageProfile/PageProfile';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/test' component={SelectComp}/>
      <Route exact path='/' component={PageHome}/>
      <Route exact path='/login' component={PageLogin}/>
      <Route exact path='/search' component={PageSearch}/>
      <Route exact path='/matcher' component={PageMatcher}/>
      <Route exact path='/signup' component={PageSignup}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/users' component={UsersSwitch}/>
    </Switch>
  </main>
);

export default Main;