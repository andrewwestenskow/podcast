import React, { Component } from 'react'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/animation-w256-h256.json'

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
      if(a.episode_id > b.episode_id){
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
            list
          </div>
        }
      </>
    )
  }
}

export default EpisodeList