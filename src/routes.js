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
import NewBlog from './Components/Admin/NewBlog';
import EditBlog from './Components/Admin/EditBlog'
import Blog from './Components/Blog/Blog'
import About from './Components/About/About'

export default(
  <Switch>
    <Route path='/login' component={Login}/>
    <Route path='/admin/dashboard' component={AuthDashboard}/>
    <Route path='/admin/addepisode/:id' component={AddNumberEpisode}/>
    <Route path='/admin/specialepisode' component={AddSpecialEpisode}/>
    <Route path='/admin/edit/episode/:id' component={EditIntercept}/>
    <Route path='/admin/edit/blog/:id' component={EditBlog}/>
    <Route path='/admin/newpost' component={NewBlog}/>
    <Route path='/' component={() => (
      <Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/episodes/list' component={EpisodeList}/>
          <Route path = '/episodes/:episode_id' component={EpisodeInterceptor}/>
          <Route exact path='/blog' component={BlogListHold}/>
          <Route path='/blog/:id' component={Blog}/>
          <Route exact path='/about' component={About}/>
        </Switch>
      </Header>
    )}/>
  </Switch>
)