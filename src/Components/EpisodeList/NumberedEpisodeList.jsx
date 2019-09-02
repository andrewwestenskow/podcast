import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import fire from '../../Assets/fire.png'

const NumberedEpisodeList = (props) => (
  <div key={props.element.episode_id} className='episode-list-item'>
    <img className='episode-list-poster' src={props.element.poster} alt="" />
    <div className="episode-list-item-content">
      <div className='episode-list-item-content-1'>
        <div className="episode-list-item-content-1-text">
          <Link to={`/episodes/${props.element.episode_id}`}><h2>
            Ep. {props.element.episodenumber}: {props.element.title}
          </h2></Link>
          <div className="list-westenscale-hold">
            <h4>On the Westenscale: {props.element.w}</h4>
            {props.element.w >= 9 && <img src={fire} alt='fire' />}
          </div>
        </div>
        <div className="iframe-hold">
          {ReactHTMLParser(props.element.player)}
        </div>
      </div>
      <div className="episode-list-item-content-2">
        <h4>Reviewed by: {props.element.author}</h4>

        <div className='review-preview'>
          {ReactHTMLParser(props.element.review)}
        </div>
        <Link to={`/episodes/${props.element.episode_id}`}>Read more...</Link>

      </div>
    </div>
  </div>
)

export default NumberedEpisodeList