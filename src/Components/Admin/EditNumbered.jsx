import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/28-loading.json'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules } from '../../Assets/quillModules'
import YouTube from 'react-youtube'
import moment from 'moment'

class EditNumbered extends Component {

  state = {
    loading: true,
    crew: [],
    cast: [],
    details: {},
    poster: '',
    backdrop: '',
    episodeNumber: null,
    review: '',
    author: '',
    trailer: '',
    a: null,
    b: null,
    s: null,
    w: null
  }

  async componentDidMount() {
    const {data} = this.props
    this.setState({
      crew: data.details.crew,
      cast: data.details.cast,
      details: data.details,
      poster: data.details.poster,
      backdrop: data.details.backdrop,
      episodeNumber: data.episodenumber,
      trailer: data.details.trailer,
      review: data.details.review,
      author: data.details.author,
      synopsis: data.details.synopsis,
      a: data.details.a,
      b: data.details.b,
      s: data.details.s,
      w: data.details.w,
      player: data.details.player
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

  editEpisode = async (e) => {
    e.preventDefault()
    const { details } = this.state

    const movie = {
      episode_id: this.props.data.episode_id,
      title: details.title,
      release: details.release,
      runtime: details.runtime,
      crew: this.state.crew,
      cast: this.state.cast,
      synopsis: details.synopsis,
      poster: this.state.poster,
      backdrop: this.state.backdrop,
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

    let result = await axios.put('/episode/numbered', movie)

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
                {this.state.crew.map(element => {
                  return <li key={element.credit_id}>
                    {element.job}: {element.name}</li>
                })}
              </ul>
              <p>Cast:</p>
              <ul className='crew-list'>
                {this.state.cast.map(element => {
                  return <li key={element.credit_id}>
                    {element.character}: {element.name}
                  </li>
                })}
              </ul>
              <p>Synopsis: {details.synopsis}</p>

            </section>

            <section className="column">
              <h1>Select a poster</h1>
              <div className='preview-poster-hold'>
                <img className='preview-poster' src={this.state.poster} alt={`${details.title} poster`} />
                <input type="text" name='poster' value={this.state.poster} onChange={(e) => this.handleChange(e)} />
              </div>
              <p>Select a backdrop</p>
              <div className='preview-poster-hold'>
                <img className='preview-backdrop' src={this.state.backdrop} alt={`${details.title} backdrop`} />
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
              <form onSubmit={(e) => this.editEpisode(e)} className="episode-info">
                <p>Episode Number</p>
                <input onChange={(e) => this.handleChange(e)} name='episodeNumber' type="number" value={this.state.episodeNumber}/>
                <p>Player HTML</p>
                <input onChange={(e) => this.handleChange(e)} name='player' type="text" value={this.state.player} />
                <p>Westenscale</p>
                <div className="westenscale-input">
                  <p>Andrew</p>
                  <input value={this.state.a} step='any' name='a' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Becca</p>
                  <input value={this.state.b} step='any' name='b' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Syd</p>
                  <input value={this.state.s} step='any' name='s' onChange={(e) => this.handleChange(e)} type="number" />
                  <p>Overall</p>
                  <input value={this.state.w} step='any' name='w' onChange={(e) => this.handleChange(e)} type="number" />
                </div>
                <p>Author</p>
                <input value={this.state.author} type="text" name='author' onChange={(e) => this.handleChange(e)} />
                <p>Review</p>
                <ReactQuill modules={modules} onChange={this.handleReviewChange} value={this.state.review} className='number-quill' theme='snow' />
                <button>Submit Episode</button>
              </form>
            </section>
          </div>}
      </>
    )
  }
}

export default withRouter(EditNumbered)