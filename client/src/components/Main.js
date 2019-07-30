import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHome from './PageHome';
import UsersSwitch from './UsersSwitch';
import PageSignup from './PageSignup/PageSignup';
import PageLogin from './PageLogin/PageLogin';
import PageSearch from './PageSearch/PageSearch';
import PageMatcher from './PageMatcher/PageMatcher';
import Authenticate from './Authenticate';
import Profile from './Profile';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PageHome}/>
      <Route exact path='/login' component={PageLogin}/>
      <Route exact path='/search' component={PageSearch}/>
      {/* le middleware cause un rerender violent, pourquoi ?*/}
      {/* <Route exact path='/search' component={Authenticate(PageSearch)}/> */}
      <Route exact path='/matcher' component={Authenticate(PageMatcher)}/>
      <Route exact path='/signup' component={PageSignup}/>
      <Route path='/profile' component={Authenticate(Profile)}/>
      <Route path='/users' component={Authenticate(UsersSwitch)}/>
    </Switch>
  </main>
);

export default Main;