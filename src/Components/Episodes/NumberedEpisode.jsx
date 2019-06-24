import React from 'react'
import ReactHTMLParser from 'react-html-parser'

const NumberedEpisode = (props) => {
  const {data} = props

  let director
  let cinematographer
  let score

  data.details.crew.forEach(element => {
    switch(element.job){
      case 'Director':
        if(director){
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

  return(
  <div className="NumberedEpisode" style={{backgroundImage: `url(${data.details.backdrop})`}}>
    <div className="white-box">
      <div className="poster-title-hold"><img className='display-poster' src={data.details.poster} alt=""/>
      <div className='title-hold'><h1>{data.title}</h1>
      <h2>by: {director}</h2>
      <p>{data.details.synopsis}</p>
      </div>
      </div>
      <iframe title="Ep. 1 - Slumdog Millionaire" src="https://www.podbean.com/media/player/beq2n-957738?from=yiiadmin&download=1&version=1&skin=1&btn-skin=107&auto=0&share=1&fonts=Helvetica&download=1&rtl=0&pbad=1" height="122" width="100%" scrolling="no" data-name="pb-iframe-player"></iframe>
      <p>{cinematographer}</p>
      <p>{score}</p>
      {ReactHTMLParser(data.details.review)}
    </div>
  </div>
  )
}

export default NumberedEpisode