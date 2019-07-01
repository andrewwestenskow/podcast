import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import moment from 'moment'

const SpecialEpisode = (props) => {
  const { data } = props
  return <div className="NumberedEpisode" style={{ backgroundImage: `url(${data.details.backdrop})` }}>
    <div className="white-box">
      <div className="movie-data-hold">
        <div className="poster-title-hold">
          <img className='display-poster' src={data.details.poster} alt="" />
          <div className='title-hold'>
            <h1>{data.title}</h1>
            <div className="black-line"></div>
          </div>
        </div>

        <div className="cast-crew-hold">
          <h1>Movies Discussed</h1>
          {data.details.movies.map(element => {
            let date = moment(element.release_date).format('YYYY')
            return <div className='special-movie' key={element.id}>
              <img src={`https://image.tmdb.org/t/p/w185/${element.poster_path}`} alt="" />
              <div className="special-movie-text">
                <p className='name'>{element.title} - {date}</p>
                <div className="black-line"></div>
                <p className='special-summary'>{element.overview}</p>
              </div>
            </div>
          })}

        </div>
      </div>
      <div className="episode-info-hold">
        <h1 className='left'>Listen Now: </h1>
        {ReactHTMLParser(data.details.player)}
        <div className="review-hold">
          <h1>Summary:</h1>
          {ReactHTMLParser(data.details.summary)
          }
        </div>
      </div>
    </div>
  </div>
}

export default SpecialEpisode