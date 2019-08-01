import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageSignup from './PageSignup/PageSignup';
import PageLogin from './PageLogin/PageLogin';
import PageSearch from './PageSearch/PageSearch';
import PageMatcher from './PageMatcher/PageMatcher';
import PageConfirmAccount from './PageConfirmAccount/PageConfirmAccount';
// import Authenticate from './Authenticate';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PageHome}/>
      <Route exact path='/confirm/:hash' component={PageConfirmAccount}/>
      <Route exact path='/login' component={PageLogin}/>
      <Route exact path='/search' component={PageSearch}/>
      <Route exact path='/matcher' component={PageMatcher}/>
      {/* le middleware cause un rerender, pourquoi ?*/}
      {/* <Route exact path='/search' component={Authenticate(PageSearch)}/> */}
      {/* <Route exact path='/matcher' component={Authenticate(PageMatcher)}/> */}
      <Route exact path='/signup' component={PageSignup}/>
    </Switch>
  </main>
);

export default Main;