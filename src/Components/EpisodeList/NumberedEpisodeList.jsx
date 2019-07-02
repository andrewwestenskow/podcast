import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import {Link} from 'react-router-dom'

const NumberedEpisodeList = (props) => (
  <div key={props.element.episode_id} className='episode-list-item'>
    <img className='episode-list-poster' src={props.element.details.poster} alt="" />
    <div className="episode-list-item-content">
      <div className='episode-list-item-content-1'>
        <div className="episode-list-item-content-1-text"><Link to={`/episodes/${props.element.episode_id}`}><h2>
          Ep. {props.element.episodenumber}: {props.element.title}
        </h2></Link>
          <h4>On the Westenscale: {props.element.details.w}</h4></div>
        <div className="iframe-hold">
          {ReactHTMLParser(props.element.details.player)}
        </div>
      </div>
      <div className="episode-list-item-content-2">
        <h4>Reviewed by: {props.element.details.author}</h4>

        <div className='review-preview'>
          {ReactHTMLParser(props.element.details.review)}
        </div>
        <Link to={`/episodes/${props.element.episode_id}`}>Read more...</Link>

      </div>
    </div>
  </div>
)

export default NumberedEpisodeList