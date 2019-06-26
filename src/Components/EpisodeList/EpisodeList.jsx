import React, { Component } from 'react'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/animation-w256-h256.json'
import ReactHTMLParser from 'react-html-parser'
import Footer from '../HeaderFooter/Footer'
import { Link } from 'react-router-dom'

class EpisodeList extends Component {

  state = {
    loading: true,
    episodes: []
  }

  async componentDidMount() {
    let episodes = await axios.get('/api/episodes')
    episodes.data.forEach(element => {
      let newDetails = JSON.parse(element.details)
      element.details = newDetails
    })
    let sortArr = episodes.data.sort((a, b) => {
      if (a.episode_id > b.episode_id) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({
      loading: false,
      episodes: sortArr
    })
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
        {this.state.loading ? <div className="Loading">
          <Lottie height={200} width={200} options={defaultOptions} />
        </div> :

          <div className="EpisodeList">
            <div className="episode-list-hold">
              <h1>All Episodes: </h1>
              {this.state.episodes.map(element => (
                <div key={element.episode_id} className='episode-list-item'>
                  <img className='episode-list-poster' src={element.details.poster} alt="" />
                  <div className="episode-list-item-content">
                    <div className='episode-list-item-content-1'>
                      <Link to={`/episodes/${element.episode_id}`}><h2>
                        Ep. {element.episodenumber}: {element.title}
                      </h2></Link>
                      <h4>On the Westenscale: {element.details.w}</h4>
                      {ReactHTMLParser(element.details.player)}
                    </div>
                    <div className="episode-list-item-content-2">
                      <h4>Reviewed by: {element.details.author}</h4>

                      <div className='review-preview'>
                        {ReactHTMLParser(element.details.review)}
                      </div>
                      <Link to={`/episodes/${element.episode_id}`}>Read more...</Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        <Footer />
      </>
    )
  }
}

export default EpisodeList