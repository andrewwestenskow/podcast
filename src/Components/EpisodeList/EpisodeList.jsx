import React from 'react'
import { connect } from 'react-redux'
import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'

const EpisodeList = (props) => {

  let episodes = props.data.episodes
  let sortArr = episodes.sort((a, b) => {
    if (a.episode_id > b.episode_id) {
      return -1
    } else {
      return 1
    }
  })

  return (
    <>
      <div className="EpisodeList">
        <div className="episode-list-hold">
          <h1>All Episodes: </h1>
          {sortArr.map(element => {
            if (element.episodenumber) {
              return <NumberedEpisodeList element={element}/>
            } else {
              return <SpecialEpisodeList element={element}/>
            }
          })}
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(EpisodeList)