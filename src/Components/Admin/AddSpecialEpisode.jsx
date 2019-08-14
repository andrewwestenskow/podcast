import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHeader from './AuthHeader'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { modules } from '../../Assets/quillModules'

class AddSpecialEpisode extends Component {

  state = {
    title: '',
    summary: '',
    poster: '',
    backdrop: '',
    movies: [],
    movieSearch: '',
    showResult: false,
    resultIndex: 0,
    results: [],
    player: ''
  }

  async componentDidMount(){
    let users = await (axios.get('/auth/users'))
    if(users.data === 'okay'){
      return
    } else {
      this.props.history.push('/')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createEpisode = async (e) => {
    e.preventDefault()
    let episode = {
      title: this.state.title,
      episodeNumber: null,
      poster: this.state.poster,
      backdrop: this.state.backdrop,
      summary: this.state.summary,
      movies: this.state.movies,
      player: this.state.player

    }

    let result = await axios.post('/episode/special', episode)

    if (result.data === 'okay') {
      alert('success')
      this.props.history.push('/admin/dashboard')
    }
  }

  handleSummaryChange = (value) => {
    this.setState({ summary: value })
  }

  searchMovies = async (e) => {
    e.preventDefault()
    this.setState({
      searching: true,
      resultIndex: 0
    })
    let searchString = this.state.movieSearch.split(' ').join('+')
    let results = await axios.get(`/movies?searchString=${searchString}`)
    this.setState({
      results: results.data.results,
      movieSearch: '',
      showResult: true
    })
  }

  nextMovie = () => {
    let num = this.state.resultIndex
    this.setState({
      resultIndex: num += 1
    })
  }

  addToSpecial = (e) => {
    e.preventDefault()
    let movies = this.state.movies
    movies.push(this.state.results[this.state.resultIndex])
    this.setState({
      showResult: false,
      results: [],
      resultIndex:0
    })
  }

  render() {
    return (
      <>
        <AuthHeader />
        <div className="AddNumberEpisode">
          <section className="column">
            <p>Episode title</p>
            <input onChange={(e) => this.handleChange(e)} type="text" name='title' />
            <p>Episode poster</p>
            <input onChange={(e) => this.handleChange(e)} type="text" name="poster" />
            <p>Episode Backdrop</p>
            <input onChange={(e) => this.handleChange(e)} type="text" name="backdrop" />
            <p>Player HTML</p>
            <input type="text" name='player' value={this.state.player} onChange={(e)=> {this.handleChange(e)}}/>
            <p>Summary</p>
            <ReactQuill modules={modules} onChange={this.handleSummaryChange} value={this.state.summary} className='number-quill' theme='snow' />
          </section>
          <section className="column">
            <p>Movie search</p>
            <form onSubmit={(e) => this.searchMovies(e)}>
              <input autoComplete='off' onChange={(e) => this.handleChange(e)} type="text" name='movieSearch' value={this.state.movieSearch} />
              <button type='submit'>Search</button></form>
            {!this.state.showResult ? <></> :
              <div className='special-results-hold'>
                <button onClick={this.nextMovie}>Next movie</button>
                <form className='special-details-preview' onSubmit={(e) => this.addToSpecial(e)}>
                  <div className="special-details">
                    <img src={`https://image.tmdb.org/t/p/original/${this.state.results[this.state.resultIndex].poster_path}`} alt="" />
                    <img src={`https://image.tmdb.org/t/p/original/${this.state.results[this.state.resultIndex].backdrop_path}`} alt="" />
                    <div className="special-details-text">
                      <p>{this.state.results[this.state.resultIndex].title}</p>
                      <p>{this.state.results[this.state.resultIndex].release_date}</p>
                      <p>{this.state.results[this.state.resultIndex].overview}</p>
                      <p>Poster</p>
                      <input onChange={(e)=>this.handleChange(e)} type="text" value={`https://image.tmdb.org/t/p/original/${this.state.results[this.state.resultIndex].poster_path}`} />
                      <p>Backdrop</p>
                      <input onChange={(e)=>this.handleChange(e)} type="text" value={`https://image.tmdb.org/t/p/original/${this.state.results[this.state.resultIndex].backdrop_path}`} />
                    </div>
                  </div>
                  <button type='submit'>Add to episode</button>
                </form>
              </div>}
          </section>
          <section className="column">
            Confirm your details
            <ul>
              {this.state.movies.map(element => {
                return <li key={element.id}>{element.title}</li>
              })}
            </ul>
            <button onClick={(e) => { this.createEpisode(e) }}>Create episode</button>
          </section>
        </div>
      </>
    )
  }
}

export default withRouter(AddSpecialEpisode)