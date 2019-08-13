import React, { Component } from 'react'
import { connect } from 'react-redux'
import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'
import axios from 'axios';


class EpisodeList extends Component {

  state = {
    episodes: [],
    currentPage: 0
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/episodeList?page=${this.state.currentPage}`)

    this.setState({
      episodes: data.episodes
    })
  }



  render() {
    return (
      <>
        <div className="EpisodeList">
          {this.state.episodes.length > 0 &&
            <div className="episode-list-hold">
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