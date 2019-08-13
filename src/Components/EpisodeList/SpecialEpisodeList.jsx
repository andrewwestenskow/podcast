import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import { Link } from 'react-router-dom'

const SpecialEpisodeList = (props) => (
  <div key={props.element.episode_id} className='episode-list-item'>
    <img className='episode-list-poster' src={props.element.poster} alt="" />
    <div className="episode-list-item-content">
      <div className='episode-list-item-content-1'>
        <div className="episode-list-item-content-1-text"><Link to={`/episodes/${props.element.episode_id}`}><h2>
          {props.element.title}
        </h2></Link>
        </div>
        <div className="iframe-hold">
          {ReactHTMLParser(props.element.player)}
        </div>
      </div>
      <div className="episode-list-item-content-2">
        <div className='review-preview'>
          {ReactHTMLParser(props.element.summary)}
        </div>
        <Link to={`/episodes/${props.element.episode_id}`}>Read more...</Link>

      </div>
    </div>
  </div>
)

export default SpecialEpisodeList