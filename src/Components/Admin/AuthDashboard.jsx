import React, { Component } from 'react'
import AuthHeader from './AuthHeader'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/40-loading.json'

class AuthDashboard extends Component {

  state = {
    loading: true
  }

  async componentDidMount() {
    let res = await axios.get('/auth/users')
    if (res.data === 'okay') {
      this.setState({
        loading: false
      })
    } else {
      this.props.history.push('/')
    }
  }

  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return (
      <>
        {!this.state.loading ? <>
          <AuthHeader />
          <div className="AuthDashboard">
            <div className="dash-section">
              <h1>Add movie</h1>
            </div>
            <div className="dash-section">
              <h1>Add blog post</h1>
            </div>
          </div>
        </> :
          <div className='AuthDashboard'>
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>}
      </>
    )
  }
}

export default withRouter(AuthDashboard)