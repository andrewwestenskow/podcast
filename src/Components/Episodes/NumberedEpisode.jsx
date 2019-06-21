import React from 'react'

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
    }
  })

  return(
  <div className="NumberedEpisode" style={{backgroundImage: `url(${data.details.backdrop})`}}>
    <div className="white-box">
      <h1>{data.title}</h1>
      <h2>by: {director}</h2>
    </div>
  </div>
  )
}

export default NumberedEpisode