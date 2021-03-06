import React, { Component } from 'react'
import axios from 'axios'
import EpisodeCarousel from './EpisodeCarousel'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Home extends Component {

  state = {
    loading: true,
    scale: [],
    fiveEpisodes: []
  }

  async componentDidMount() {
    let { data } = await axios.get('/api/home')

    this.setState({
      scale: data.scale,
      loading: false,
      fiveEpisodes: data.randomToSend
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
            <div className="westenscale-description">
              <h1>The Westescale is the only definitive way to rank movies on a scale from 1 - 10.  </h1>
              <div className='black-line'></div>
              <p>After months of meticulous development, the hosts of <strong>We Watch Movies and then Talk About Them </strong> have developed an all new and fool proof way to rank any and all movies on a scale from 1 - 10.  Taking its creators name, it was dubbed: <strong>THE WESTENSCALE</strong></p>
              <p>Here you will find the absolute best of the best of the movies that we have watched and subsequently talked about </p>
            </div>
            <div className="westenscale-hold">
              {this.state.loading ? <div>loading</div> :
                <div>
                  <h1>THE WESTENSCALE</h1>
                  <div className='black-line'></div>
                  <ul>
                    {this.state.scale.map(element => {
                      return <Link style={{color: 'black'}} key={element.westenscale_id} to={`/episodes/${element.episode_id}`}>
                        <li >{element.title} - {element.w}</li>
                      </Link>
                    })}
                  </ul>
                </div>}
            </div>
          </section>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Home)