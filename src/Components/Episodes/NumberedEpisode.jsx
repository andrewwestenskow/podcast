import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import YouTube from 'react-youtube'

const NumberedEpisode = (props) => {
  const { data } = props

  const crew = []

  let director

  data.details.crew.forEach(element => {
    switch (element.job) {
      case 'Director':
        if (director) {
          director = `${director} & ${element.name}`
        } else {
          director = element.name
        }
        break;
      default:
        crew.push(element)
    }
  })

  return (
    <div className="NumberedEpisode" style={{ backgroundImage: `url(${data.details.backdrop})` }}>
      <div className="white-box">
        <div className="movie-data-hold">
          <div className="poster-title-hold">
            <img className='display-poster' src={data.details.poster} alt="" />
            <div className='title-hold'>
              <h1>{data.title}</h1>
              <div className="black-line"></div>
              <h2>by: {director}</h2>
              <p>{data.details.synopsis}</p>
            </div>
          </div>
          <p className='release'>Released {data.details.release}</p>
          <p className='release'>{data.details.runtime} minutes</p>

          <div className="cast-crew-hold">
          <h1>Cast:</h1>
            {data.details.cast.map(element => {
              return <div className='cast-member' key={element.credit_id}>
                <img src={`https://image.tmdb.org/t/p/w185/${element.profile_path}`} alt="" />
                <div className="cast-member-name">
                  <p className='name'>{element.name}</p>
                  <div className="black-line"></div>
                  <p className='character'>{element.character}</p>
                </div>
              </div>
            })}
            <h1>Crew:</h1>
            {data.details.crew.map(element => {
              return <div key={element.credit_id} className='cast-member'>
                <img src={`https://image.tmdb.org/t/p/w185/${element.profile_path}`} alt="" />
                <div className="cast-member-name">
                  <p className='name'>{element.name}</p>
                  <div className="black-line"></div>
                  <p className='character'>{element.job}</p>
                </div>
              </div>
            })}
            
          </div>
        </div>
        <div className="episode-info-hold">
          <h1 className='left'>Listen Now: </h1>
          {ReactHTMLParser(data.details.player)}
          <div className="episode-westenscale-hold">
            <h1>On the Westenscale: {data.details.w}</h1>
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
            }
          </div>
          <h1 className='left'>Trailer: </h1>
          <YouTube videoId={data.details.trailer} />
        </div>
      </div>
    </div>
  )
}

export default NumberedEpisode