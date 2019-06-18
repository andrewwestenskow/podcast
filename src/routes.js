import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Header from './Components/HeaderFooter/Header'
import Login from './Components/Admin/Login'
import AuthDashboard from './Components/Admin/AuthDashboard'
import AddNumberEpisode from './Components/Admin/AddNumberEpisode'

export default(
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/admin/dashboard' component={AuthDashboard}/>
    <Route path='/admin/addepisode/:id' component={AddNumberEpisode}/>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)