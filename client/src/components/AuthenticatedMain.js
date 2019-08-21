import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageSearch from './PageSearch/PageSearch';
import PageMatcher from './PageMatcher/PageMatcher';
import PageNotifications from './PageNotifications/PageNotifications';
import Profile from './PageProfile/PageProfile';
import PageChat from './PageChat/PageChat';

const AuthenticatedApp = () => (
  <main>
    <Switch>
      <Route exact path='/search' component={PageSearch}/>
      <Route exact path='/notifications' component={PageNotifications}/>
      <Route exact path='/chat' component={PageChat}/>
      <Route exact path='/matcher' component={PageMatcher}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/profile/:username' component={Profile}/>
      <Route exact path='/profile' component={Profile}/>
    </Switch>
  </main>
);

export default AuthenticatedApp;
