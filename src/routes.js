import {Switch, Route} from 'react-router-dom'
import React from 'react'
import Home from './Components/Home/Home'
import Header from './Components/HeaderFooter/Header'
import Login from './Components/Admin/Login'
import AuthDashboard from './Components/Admin/AuthDashboard'
import AddNumberEpisode from './Components/Admin/AddNumberEpisode'
import AddSpecialEpisode from './Components/Admin/AddSpecialEpisode'
import EpisodeInterceptor from './Components/Episodes/EpisodeInterceptor';
import EditIntercept from './Components/Admin/EditIntercept';
import EpisodeList from './Components/EpisodeList/EpisodeList'
import BlogListHold from './Components/Blog/BlogListHold'

export default(
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/admin/dashboard' component={AuthDashboard}/>
    <Route path='/admin/addepisode/:id' component={AddNumberEpisode}/>
    <Route path='/admin/specialepisode' component={AddSpecialEpisode}/>
    <Route path='/admin/edit/:id' component={EditIntercept}/>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/episodes/list' component={EpisodeList}/>
          <Route path = '/episodes/:episode_id' component={EpisodeInterceptor}/>
          <Route exact path='/blog' component={BlogListHold}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)