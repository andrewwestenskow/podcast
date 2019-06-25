import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import YouTube from 'react-youtube'

const NumberedEpisode = (props) => {
  const { data } = props

  let director
  let cinematographer
  let score

  data.details.crew.forEach(element => {
    switch (element.job) {
      case 'Director':
        if (director) {
          director = `${director} & ${element.name}`
        } else {
          director = element.name
        }
        break;
      case 'Director of Photography':
        cinematographer = element.name
        break;
      case 'Original Music Composer':
        score = element.name
        break;
      default:
        console.log('none')
    }
  })

  return (
    <div className="NumberedEpisode" style={{ backgroundImage: `url(${data.details.backdrop})` }}>
      <div className="white-box">
        <div className="movie-data-hold">
          <div className="poster-title-hold"><img className='display-poster' src={data.details.poster} alt="" />
            <div className='title-hold'><h1>{data.title}</h1>
              <h2>by: {director}</h2>
              <p>{data.details.synopsis}</p>
            </div>
          </div>
          <p>Released {data.details.runtime}</p>
          <p>{data.details.runtime} minutes</p>

          <div className="cast-crew-hold">
            <p>Photography by: {cinematographer}</p>
            <p>Original score by: {score}</p>
          </div>
        </div>
        <div className="episode-info-hold">
          <YouTube videoId={data.details.trailer} />
          {ReactHTMLParser(data.details.player)}
          <div className="westenscale-hold">
            <h1>Overall: {data.details.w}</h1>
            <div className="scores-hold">
              <p>Andrew: {data.details.a}</p>
              <p>
                Becca: {data.details.b}
              </p>
              <p>Syd: {data.details.s}</p>
            </div>
          </div>
          <div className="review-hold">
            <h1>Reviewed:</h1>
            <h3>By {data.details.author}</h3>
            {ReactHTMLParser(data.details.review)
            }</div>
        </div>
      </div>
    </div>
  )
}

export default NumberedEpisode