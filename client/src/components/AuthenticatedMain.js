import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageSearch from './PageSearch/PageSearch';
import PageMatcher from './PageMatcher/PageMatcher';
import PageNotifications from './PageNotifications/PageNotifications';
import Profile from './PageProfile/PageProfile';
import TestProfile from './TestProfile';


const AuthenticatedApp = () => (
  <main>
    <Switch>
      <Route exact path='/search' component={PageSearch}/>
      <Route exact path='/notifications' component={PageNotifications}/>
      <Route exact path='/matcher' component={PageMatcher}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/users/:username' component={TestProfile}/>
      {/* <Route render={() => <Redirect to={{pathname: "/search"}} />} /> */}
      {/* le middleware cause un rerender, pourquoi ?*/}
      {/* <Route exact path='/search' component={Authenticate(PageSearch)}/> */}
      {/* <Route exact path='/matcher' component={Authenticate(PageMatcher)}/> */}
    </Switch>
  </main>
);

export default AuthenticatedApp;