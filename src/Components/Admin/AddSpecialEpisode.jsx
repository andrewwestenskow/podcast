import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHeader from './AuthHeader'
import axios from 'axios'

class AddSpecialEpisode extends Component {

  state = {
    title: '',
    summary: '',
    poster: '',
    backdrop: ''
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
              <input onChange={(e) => this.handleChange(e)} type="text" name='synopsis' />
              <button type='submit'>Create episode</button>
            </form>
          </section>
          <section className="column">
            <p>Poster</p>
            <img src={this.state.poster} className='preview-poster' alt=""/>
            <p>Backdrop</p>
            <img src={this.state.backdrop} className='preview-backdrop' alt=""/>
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