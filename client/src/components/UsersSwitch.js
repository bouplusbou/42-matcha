import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Users from './Users'
import User from './User'
import Authenticate from './Authenticate'

// The UserSwitch component matches one of two different routes
// depending on the full pathname
const UsersSwitch = () => (
  <Switch>
    <Route exact path='/users' component={Users}/>
    <Route path='/users/:id' component={Authenticate(User)}/>
  </Switch>
)


export default UsersSwitch