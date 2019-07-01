import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHeader from './AuthHeader'
import axios from 'axios'
import ReactQuill from 'react-quill'
import {modules} from '../../Assets/quillModules'

class AddSpecialEpisode extends Component {

  state = {
    title: '',
    summary: '',
    poster: '',
    backdrop: '',
    movies: [],
    movieSearch: '',
    showResult: false,
    results: []
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
      poster: this.state.poster,
      backdrop: this.state.backdrop,
      synopsis: this.state.summary
    }

    let result = await axios.post('/episode/special', episode)

    if (result.data === 'okay'){
      alert('success')
      this.props.history.push('/admin/dashboard')
    }
  }

  handleReviewChange = (value) => {
    this.setState({ summary: value })
  }

  searchMovies = async (e) => {
    e.preventDefault()
    this.setState({
      searching: true
    })
    let searchString = this.state.movieSearch.split(' ').join('+')
    let results = await axios.get(`/movies?searchString=${searchString}`)
    this.setState({
      results: results.data.results,
      movieTitle: '',
      showResults: true,
      searching: false
    })
  }

  render() {
    return (
      <>
        <AuthHeader />
        <div className="AddNumberEpisode">
          <section className="column">
            <form onSubmit={(e) => this.createEpisode(e)} className="special-form">
              <p>Episode title</p>
              <input onChange={(e) => this.handleChange(e)} type="text" name='title' />
              <p>Episode poster</p>
              <input onChange={(e) => this.handleChange(e)} type="text" name="poster" />
              <p>Episode Backdrop</p>
              <input onChange={(e) => this.handleChange(e)} type="text" name="backdrop" />
              <p>Summary</p>
              <ReactQuill modules={modules} onChange={this.handleSummaryChange} value={this.state.summary} className='number-quill' theme='snow' />
              <button type='submit'>Create episode</button>
            </form>
          </section>
          <section className="column">
            <p>Poster</p>
            <img src={this.state.poster} className='preview-poster' alt=""/>
            <p>Backdrop</p>
            <img src={this.state.backdrop} className='preview-backdrop' alt=""/>
            <p>Movie search</p>
            <input onChange={(e)=>this.handleChange(e)} type="text" name='movieSearch' value={this.state.movieSearch}/>
            {!this.state.showResult ? <></> : 
          <div className='special-results-hold'>
            <form onSubmit={(e) => this.addToSpecial(e)}>
              {/* <img src={} alt=""/> */}
            </form>
          </div>}
          </section>
          <section className="column">
            Confirm your details
          </section>
        </div>
      </>
    )
  }
}

export default withRouter(AddSpecialEpisode)