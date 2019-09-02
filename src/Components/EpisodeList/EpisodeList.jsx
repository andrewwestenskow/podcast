import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'
import axios from 'axios';
import queryString from 'query-string'


class EpisodeList extends Component {

  state = {
    episodes: [],
    currentPage: null,
    numPages: null
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.getList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      window.scrollTo(0,0)
      this.getList()
    }
  }

  getList = async () => {
    let { page } = queryString.parse(this.props.location.search)

    const { data } = await axios.get(`/api/episodeList?page=${+page - 1}`)

    console.log(data)

    this.setState({
      episodes: data.episodes,
      currentPage: (+page - 1),
      numPages: data.numPages
    })
  }



  render() {

    let pages = []
    for (let i = 1; i < this.state.numPages + 1; i++) {
      pages.push(i)
    }

    return (
      <>
        <div className="EpisodeList">
          {this.state.episodes.length > 0 &&
            <div className="episode-list-hold">
              <h1>All Episodes: </h1>
              <>{this.state.episodes.map(element => {
                if (element.episodenumber) {
                  return <NumberedEpisodeList key={element.episode_id} element={element} />
                } else {
                  return <SpecialEpisodeList key={element.episode_id} element={element} />
                }
              })}</>
              <div className="page-numbers-hold">
                {pages.map(element => {
                  return <Link
                    to={`/episodes/list?page=${element}`}
                    key={element}>
                      <div 
                      className="page-number"
                      style={(this.state.currentPage + 1) === element ?{backgroundColor: 'rgb(127, 127, 127, .45)'} : {backgroundColor: 'transparent'}}
                      >
                        {element}
                      </div>
                  </Link>
                })}
              </div>
            </div>}
        </div>
      </>
    )
  }
}



export default withRouter(EpisodeList)