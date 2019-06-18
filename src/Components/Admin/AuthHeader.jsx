import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import BiggerMovies from '../../Assets/bigger_movies.png'

const AuthHeader = (props) => {

  const logout = () => {
    axios.delete('/auth/logout')
    props.history.push('/login')
  }

  return(
    <header className='AuthHeader'>
      <img src={BiggerMovies} alt="We watch podcast" className='header-logo'/>
      <button onClick={logout}>Logout</button>
    </header>
  )
}

export default withRouter(AuthHeader)