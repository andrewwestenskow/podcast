import React, { Component } from 'react'
import axios from 'axios'
import EpisodeCarousel from './EpisodeCarousel'
import { connect } from 'react-redux'


class Home extends Component {

  state = {
    loading: true,
    scale: [],
    fiveEpisodes: []
  }

  async componentDidMount() {
    let scale = await axios.get('/api/westenscale')
    scale.data.sort((a, b) => {
      if (a.w < b.w) {
        return 1
      } else {
        return -2
      }
    })

    let episodes = [...this.props.data.episodes]
    let fiveEpisodesIndex = []

    while (fiveEpisodesIndex.length < 5) {
      let num = Math.floor(Math.random() * episodes.length - 1)
      if (fiveEpisodesIndex.indexOf(num) === -1) {
        fiveEpisodesIndex.push(num)
      }
    }

    let fiveEpisodes = episodes.filter((element, index) => {
      return fiveEpisodesIndex.includes(index)
    })

    this.setState({
      scale: scale.data,
      loading: false,
      fiveEpisodes
    })
  }

  render() {
    return (
      <>
        <div className='Home'>
          <div className="hero-hold">
            <div className="hero-left">
              <h2>The only podcast on the internet</h2>
              <h3>where we </h3>
              <h1>watch a movie</h1>
              <h3>and then</h3>
              <h1>talk about it</h1>
            </div>
            <div className="hero-right">
              <EpisodeCarousel fiveEpisodes={this.state.fiveEpisodes} />
            </div>
          </div>
          <section className="home-section">

          </section>
          <div className="westenscale-hold">
            {this.state.loading ? <div>loading</div> :
              <ul>
                {this.state.scale.map(element => (
                  <li key={element.westenscale_id}>{element.title}</li>
                ))}
              </ul>}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Home)