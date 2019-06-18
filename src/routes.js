import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Header from './Components/HeaderFooter/Header'
import Login from './Components/Admin/Login'
import AuthDashboard from './Components/Admin/AuthDashboard'

export default(
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/admin/dashboard' component={AuthDashboard}/>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)