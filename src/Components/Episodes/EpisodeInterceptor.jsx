import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/animation-w256-h256.json'
import NumberedEpisode from './NumberedEpisode'
import SpecialEpisode from './SpecialEpisode'
import axios from 'axios'

class EpisodeInterceptor extends Component {

  state = {
    loading: true,
    data: {}
  }

  async componentDidMount() {
    let { data } = await axios.get(`/api/episode?id=${this.props.match.params.episode_id}`)

    this.setState({
      data,
      loading: false
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
        </div>
          :
          <>
            {this.state.data.episodenumber ?
              <NumberedEpisode data={this.state.data} /> :
              <SpecialEpisode data={this.state.data} />}
          </>}
      </>
    )
  }
}

export default withRouter(EpisodeInterceptor)