import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import UsersSwitch from './UsersSwitch'
import Signup from './Signup'
import Login from './Login'
import SelectComp from './test'
import Search from './Search'
import Logout from './Logout'
import Authenticate from './Authenticate'
import Profile from './Profile'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/test' component={SelectComp}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/logout' component={Logout}/>
      <Route exact path='/search' component={Authenticate(Search)}/>
      <Route exact path='/signup' component={Signup}/>
      <Route path='/profile' component={Authenticate(Profile)}/>
      <Route path='/users' component={Authenticate(UsersSwitch)}/>
    </Switch>
  </main>
)

export default Main