import React from 'react'
import { withRouter } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from '../../Assets/Lotties/animation-w256-h256.json'
import NumberedEpisode from './NumberedEpisode'
import SpecialEpisode from './SpecialEpisode'
import { connect } from 'react-redux'

const EpisodeInterceptor = (props) => {

  let loading = true

  let index = props.data.episodes.findIndex( element => {
    return (+element.episode_id) === (+props.match.params.episode_id)
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  if(index !== -1){
    loading = false
  }

  return (
    <>
      {loading ? <div className="Loading">
        <Lottie height={200} width={200} options={defaultOptions} />
      </div>
        : <>
          {props.data.episodes[index].episodenumber ? 
          <NumberedEpisode data={props.data.episodes[index]} /> :
            <SpecialEpisode data={props.data.episodes[index]} />}
        </>}
    </>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(withRouter(EpisodeInterceptor))