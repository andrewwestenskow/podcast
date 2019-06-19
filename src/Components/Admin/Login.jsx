import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import BiggerMovies from '../../Assets/bigger_movies.png'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/2469-dino-dance.json'

class Login extends Component {

  state = {
    username: '',
    password: '',
    loading: false
  }

  handleLogin = async (e) => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      this.setState({
        loading: true
      })
      let user = { username, password }
      let login = await axios.post('/auth/login', user)
      if (login.data.isAuthenticated) {
        this.props.history.push('/admin/dashboard')
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    const options = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <div className='Login'>
        {this.state.loading ? 
        <Lottie options={options} className='auth-logo'/>
        : <img className='auth-logo' src={BiggerMovies} alt="we watch podcast" />}
        <form className='login-form' onSubmit={(e) => this.handleLogin(e)}>
          <h1>Admin login</h1>
          <p>Username</p>
          <input onChange={(e) => this.handleChange(e)} value={this.state.username} name='username' type="text" />
          <p>Password</p>
          <input onChange={(e) => this.handleChange(e)} value={this.state.password} name='password' type="password" />
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}
export default withRouter(Login)