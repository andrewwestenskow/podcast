import React, { Component } from 'react'
import axios from 'axios'
import AuthHeader from './AuthHeader'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/28-loading.json'
import ReactQuill from 'react-quill'
import { modules } from '../../Assets/quillModules'
import 'react-quill/dist/quill.snow.css'
import YouTube from 'react-youtube'
import moment from 'moment'

class AddNumberEpisode extends Component {

  state = {
    loading: true,
    crew: [],
    cast: [],
    details: {},
    poster: '',
    posterNumber: 0,
    backdrop: '',
    backdropNumber: 0,
    episodeNumber: null,
    youTubeLink: '',
    review: '',
    author: '',
    trailer: '',
    a: null,
    b: null,
    s: null,
    w: null,
    submitting: false
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    let results = await axios.get(`/details?id=${id}`)
    // eslint-disable-next-line
    
    this.setState({
      details: results.data,
      poster: `https://image.tmdb.org/t/p/original/${results.data.images.posters[this.state.posterNumber].file_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${results.data.images.backdrops[this.state.backdropNumber].file_path}`,
      trailer: results.data.videos.results[0].key
    })
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

  handleReviewChange = (value) => {
    this.setState({ review: value })
  }

  posterUp = () => {
    let num = this.state.posterNumber
    this.setState({
      posterNumber: num += 1,
      poster: `https://image.tmdb.org/t/p/original/${this.state.details.images.posters[this.state.posterNumber + 1].file_path}`
    })
  }
  posterDown = () => {
    let num = this.state.posterNumber
    this.setState({
      posterNumber: num -= 1,
      poster: `https://image.tmdb.org/t/p/original/${this.state.details.images.posters[this.state.posterNumber - 1].file_path}`
    })
  }

  backdropUp = () => {
    let num = this.state.backdropNumber
    this.setState({
      backdropNumber: num += 1,
      backdrop: `https://image.tmdb.org/t/p/original/${this.state.details.images.backdrops[this.state.backdropNumber + 1].file_path}`
    })
  }
  backdropDown = () => {
    let num = this.state.backdropNumber
    this.setState({
      backdropNumber: num -= 1,
      backdrop: `https://image.tmdb.org/t/p/original/${this.state.details.images.backdrops[this.state.backdropNumber - 1].file_path}`
    })
  }

  handleCastCheck = (element) => {
    let exists = this.state.cast.findIndex(person => {
      return element.credit_id === person.credit_id
    })

    if(exists === -1) {
      let cast = this.state.cast
      cast.push(element)
      this.setState({
        cast: cast
      })
    } else {
      let cast = this.state.cast
      cast.splice(exists, 1)
      this.setState({
        cast: cast
      })
    }
  }

  handleCrewCheck = (element) => {
    let exists = this.state.crew.findIndex(person => {
      return element.credit_id === person.credit_id
    })

    if(exists === -1) {
      let crew = this.state.crew
      crew.push(element)
      this.setState({
        crew: crew
      })
    } else {
      let crew = this.state.crew
      crew.splice(exists, 1)
      this.setState({
        crew: crew
      })
    }
  }

  createEpisode = async (e) => {
    e.preventDefault()
    this.setState({
      submitting: true
    })
    const { details } = this.state

    const movie = {
      title: details.title,
      release: moment(details.release_date).format('MMMM DD, YYYY'),
      runtime: details.runtime,
      crew: this.state.crew,
      cast: this.state.cast,
      synopsis: details.overview,
      poster: `https://image.tmdb.org/t/p/original/${details.images.posters[this.state.posterNumber].file_path}`,
      backdrop: `https://image.tmdb.org/t/p/original/${details.images.backdrops[this.state.backdropNumber].file_path}`,
      episodeNumber: this.state.episodeNumber,
      player: this.state.player,
      review: this.state.review,
      author: this.state.author,
      trailer: this.state.trailer,
      a: this.state.a,
      b: this.state.b,
      s: this.state.s,
      w: this.state.w
    }

    let result = await axios.post('/episode/numbered', movie)

    if (result.data === 'okay') {
      alert('Success')
      this.props.history.push('/admin/dashboard')
    }
  }

  render() {
    const { details } = this.state

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
        <AuthHeader />
        {this.state.loading ?
          <Lottie options={defaultOptions} width={500} height={250} />
          : <div className="AddNumberEpisode">
            <section className="column">
              <h1>Movie details</h1>
              <h2>{details.title}</h2>
              <p>{moment(details.release_date).format('MMMM DD, YYYY')}</p>
              <p>Runtime: {details.runtime} minutes</p>
              <p>Crew:</p>
              <ul className='crew-list'>
                {this.state.details.credits.crew.map(element => {
                  return <li key={element.credit_id}>
                  <input onChange={()=>this.handleCrewCheck(element)} type="checkbox"/>
                  {element.job}: {element.name}</li>
                })}
              </ul>
              <p>Cast:</p>
              <ul className='crew-list'>
                {this.state.details.credits.cast.map(element => {
                  return <li key={element.credit_id}>
                    <input onChange={()=>this.handleCastCheck(element)} type="checkbox"/>
                    {element.character}: {element.name}
                  </li>
                })}
              </ul>
              <p>Synopsis: {details.overview}</p>

            </section>

            <section className="column">
              <h1>Select a poster</h1>
              <div className='preview-poster-hold'>
                <img className='preview-poster' src={this.state.poster} alt={`${details.title} poster`} />
                <button onClick={this.posterDown} disabled={this.state.posterNumber === 0} >Previous</button>
                <button onClick={this.posterUp} disabled={this.state.posterNumber === (details.images.posters.length - 1)}>Next</button>
                <input type="text" name='poster' value={this.state.poster} onChange={(e) => this.handleChange(e)} />
              </div>
              <p>Select a backdrop</p>
              <div className='preview-poster-hold'>
                <img className='preview-backdrop' src={this.state.backdrop} alt={`${details.title} backdrop`} />
                <button onClick={this.backdropDown} disabled={this.state.backdropNumber === 0}>Previous</button>
                <button onClick={this.backdropUp} disabled={this.state.backdropNumber === (details.images.backdrops.length - 1)}>Next</button>
                <input type="text" name='backdrop' value={this.state.backdrop} onChange={(e) => this.handleChange(e)} />
              </div>
              <div className="trailer-preview-hold">
                <p>Confirm trailer</p>
                <input type="text" name='trailer' onChange={(e) => this.handleChange(e)} value={this.state.trailer} />
                <YouTube className='trailer-preview' videoId={this.state.trailer} />
              </div>
            </section>

            <section className="column">
              <h1>Episode information</h1>
              <form onSubmit={(e) => this.createEpisode(e)} className="episode-info">
                <p>Episode Number</p>
                <input onChange={(e) => this.handleChange(e)} name='episodeNumber' type="number" />
                <p>Player HTML</p>
                <input onChange={(e) => this.handleChange(e)} name='player' type="text" />
                <p>Westenscale</p>
                <div className="westenscale-input">
                  <p>Becca</p>
                  <input step='any' name='b' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Syd</p>
                  <input step='any' name='s' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Andrew</p>
                  <input step='any' name='a' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Overall</p>
                  <input step='any' name='w' onChange={(e) => this.handleChange(e)} type="number" />
                </div>
                <p>Author</p>
                <input type="text" name='author' onChange={(e) => this.handleChange(e)} />
                <p>Review</p>
                <ReactQuill modules={modules} onChange={this.handleReviewChange} value={this.state.review} className='number-quill' theme='snow' />
                {this.state.submitting ? <div>loading...</div> :<button>Submit Episode</button>}
              </form>
            </section>
          </div>}
      </>
    )
  }
}

export default withRouter(AddNumberEpisode)