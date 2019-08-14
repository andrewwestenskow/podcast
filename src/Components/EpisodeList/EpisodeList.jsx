import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'
import axios from 'axios';
import queryString from 'query-string'


class EpisodeList extends Component {

  state = {
    episodes: [],
    currentPage: null
  }

  componentDidMount() {
    this.getList()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.location.search !== this.props.location.search){
      this.getList()
    }
  }

  getList = async () => {
    let {page} = queryString.parse(this.props.location.search)
    
    const {data} = await axios.get(`/api/episodeList?page=${+page - 1}`)

    this.setState({
      episodes: data.episodes,
      currentPage: (+page - 1)
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



export default withRouter(EpisodeList)