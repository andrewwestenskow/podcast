import React, { Component } from 'react'
import { connect } from 'react-redux'

import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'


class EpisodeList extends Component {

  state = {
    episodes: []
  }

  componentDidMount() {
    let episodes = this.props.data.episodes
    let sortArr = episodes.sort((a, b) => {
      if (a.episode_id > b.episode_id) {
        return -1
      } else {
        return 1
      }
    })
    this.setState({
      episodes: sortArr
    })
  }



  render() {
    return (
      <>
        <div className="EpisodeList">
          {<div className="episode-list-hold">
            <h1>All Episodes: </h1>
            {this.state.episodes.map(element => {
              if (element.episodenumber) {
                return <NumberedEpisodeList key={element.episode_id} element={element} />
              } else {
                return <SpecialEpisodeList key={element.episode_id} element={element} />
              }
            })}
          </div>}
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(EpisodeList)