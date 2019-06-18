import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

const AuthHeader = (props) => {

  const logout = () => {
    axios.delete('/auth/logout')
    props.history.push('/login')
  }

  return(
    <header className='AuthHeader'>
      Auth Header
      <button onClick={logout}>Logout</button>
    </header>
  )
}

export default withRouter(AuthHeader)