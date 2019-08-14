import React, { Component } from 'react'
import AuthHeader from './AuthHeader'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/40-loading.json'
import data2 from '../../Assets/Lotties/291-searchask-loop.json'
import { Link } from 'react-router-dom'

class AuthDashboard extends Component {

  state = {
    loading: true,
    movieTitle: '',
    results: [],
    showResults: false,
    displayNumber: 0,
    episodeNumber: null,
    searching: false,
    episodes: [],
    editEpisode: '',
    nothingFound: false,
    blogs: [],
    editBlog: ''
  }

  async componentDidMount() {
    let res = await axios.get('/auth/users')
    if (res.data === 'okay') {
      let episodes = await axios.get('/api/episodes')
      let blogs = await axios.get('/api/blogs')
      blogs.data.sort((a,b) => {
        if(a.blogs_id < b.blogs_id){
          return 1
        } else {
          return -1
        }
      })
      episodes.data.sort((a,b) => {
        if(a.episode_id < b.episode_id){
          return 1
        } else {
          return -1
        }
      })
      this.setState({
        loading: false,
        episodes: episodes.data,
        blogs: blogs.data
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
    this.setState({
      searching: true,
      nothingFound: false
    })
    let searchString = this.state.movieTitle.split(' ').join('+')
    let results = await axios.get(`/movies?searchString=${searchString}`)
    if(results.data.results.length === 0){
      this.setState({
        nothingFound: true,
        searching: false
      })
    } else {
      this.setState({
        results: results.data.results,
        movieTitle: '',
        showResults: true,
        searching: false
      })
    }
  }

  nextMovie = () => {
    let num = this.state.displayNumber
    if(num === this.state.results.length - 1){
      alert('No more movies')
    } else {
      this.setState({
        displayNumber: num += 1
      })
    }
  }

  addToDb = (e) => {
    e.preventDefault()
    this.props.history.push(`/admin/addepisode/${this.state.results[this.state.displayNumber].id}`)
  }

  editRedirect = (e) => {
    e.preventDefault()
    this.props.history.push(`/admin/edit/episode/${this.state.editEpisode}`)
  }
  editBlogRedirect = (e) => {
    e.preventDefault()
    this.props.history.push(`/admin/edit/blog/${this.state.editBlog}`)
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

    const searchOptions = {
      loop: true,
      autoplay: true,
      animationData: data2,
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
                {this.state.searching ?
                  <Lottie options={searchOptions} width={50} height={50} />
                  :
                  <><input autoComplete='off' onChange={(e) => this.handleChange(e)} value={this.state.movieTitle} type="text" name='movieTitle' />
                    <button type='submit' >Search</button></>}
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
                  {this.state.nothingFound && <p>No movies found</p>}
            </div>
            <Link to='/admin/specialepisode'><div style={{ cursor: 'pointer' }} className="dash-section">
              <h1>Add Special Episode</h1>
            </div></Link>
            <div className="dash-section">
              <h1>Edit episode</h1>
              <form onSubmit={(e)=>this.editRedirect(e)}>
                <select onChange={(e) => this.handleChange(e)} name="editEpisode">
                  <option value="">---</option>
                  {this.state.episodes.map(element => (
                    <option key={element.episode_id} value={+element.episode_id}>{element.title}</option>
                  ))}
                </select>
                <button type='submit'>Edit</button>
              </form>
            </div>
            <Link to='/admin/newpost'><div style={{ cursor: 'pointer' }} className="dash-section">
              <h1>Add blog post</h1>
            </div></Link>
            <div className="dash-section">
              <h1>Edit Blog Post</h1>
              <form onSubmit={(e)=>this.editBlogRedirect(e)}>
                <select onChange={(e) => this.handleChange(e)} name="editBlog">
                  <option value="">---</option>
                  {this.state.blogs.map(element => (
                    <option key={element.blogs_id} value={+element.blogs_id}>{element.title}</option>
                  ))}
                </select>
                <button type='submit'>Edit</button>
              </form>
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