import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Header from './Components/HeaderFooter/Header'

export default(
  <Switch>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)