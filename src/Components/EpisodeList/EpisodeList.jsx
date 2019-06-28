import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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
          {sortArr.map(element => (
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
    </>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(EpisodeList)