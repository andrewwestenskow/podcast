import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Header from './Components/HeaderFooter/Header'
import Login from './Components/Admin/Login'
import AuthHeader from './Components/Admin/AuthHeader'

export default(
  <Switch>
    <Route path='/login' component={Login}/>
    <Route exact path='/admin' component={()=>(
      <AuthHeader>
        <Switch>
          
        </Switch>
      </AuthHeader>
    )}/>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)