import React, { Component } from 'react'
import AuthHeader from './AuthHeader'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/40-loading.json'
import {Link} from 'react-router-dom'

class AuthDashboard extends Component {

  state = {
    loading: true,
    movieTitle: '',
    results: [],
    showResults: false,
    displayNumber: 0,
    episodeNumber: null
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchMovies = async (e) => {
    e.preventDefault()
    let searchString = this.state.movieTitle.split(' ').join('+')
    let results = await axios.get(`/movies?searchString=${searchString}`)
    this.setState({
      results: results.data.results,
      movieTitle: '',
      showResults: true
    })
  }

  nextMovie = () => {
    let num = this.state.displayNumber
    this.setState({
      displayNumber: num += 1
    })
  }

  addToDb = (e) => {
    e.preventDefault()
    this.props.history.push(`/admin/addepisode/${this.state.results[this.state.displayNumber].id}`)
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
              <h1>Add episode</h1>
              <form
                onSubmit={(e) => this.searchMovies(e)} className='new-movie-form'>
                <input autoComplete='off' onChange={(e) => this.handleChange(e)} value={this.state.movieTitle} type="text" name='movieTitle' />
                <button type='submit' >Search</button>
              </form>
              {this.state.showResults &&
                <div className="results-hold">
                  <div className="results-details">
                    <img src={`https://image.tmdb.org/t/p/original/${this.state.results[this.state.displayNumber].poster_path}`} alt="movie poster" className='confirm-poster' />
                    <div className="results-text">
                      <p>{this.state.results[this.state.displayNumber].original_title}</p>
                      <p>{this.state.results[this.state.displayNumber].release_date}</p>
                    </div>
                  </div>
                  <form className='confirm-form' onSubmit={(e) => this.addToDb(e)}>
                    <p>Is this the movie you're looking for?</p>
                    <div>
                      <button type='submit'>Yes</button>
                      <button type='button' onClick={this.nextMovie}>No</button>
                    </div>
                  </form></div>}
            </div>
            <Link to='/admin/newpost'><div style={{cursor: 'pointer'}} className="dash-section">
            <h1>Add blog post</h1>
            </div></Link>
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