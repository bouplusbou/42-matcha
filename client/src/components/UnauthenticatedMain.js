import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageSignup from './PageSignup/PageSignup';
import PageLogin from './PageLogin/PageLogin';
import PageConfirmAccount from './PageConfirmAccount/PageConfirmAccount';
import PageResetPassword from './PageResetPassword/PageResetPassword';
import PageHome from './PageHome/PageHome';

const UnauthenticatedMain = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PageHome}/>
      <Route exact path='/confirm/:hash' component={PageConfirmAccount}/>
      <Route exact path='/resetPassword/:hash' component={PageResetPassword}/>
      <Route exact path='/login' component={PageLogin}/>
      <Route exact path='/signup' component={PageSignup}/>
    </Switch>
  </main>
);

export default UnauthenticatedMain;