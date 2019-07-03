import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'


const EpisodeCarousel = (props) => {

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    className: 'carousel-item',
    lazyLoad: true,
    centerPadding: 0,
    centerMode: true
  }

  return (
    <div className='EpisodeCarousel'>
      <Slider {...settings}>
        {props.fiveEpisodes.map(element => {
          return <div
            className='slide-hold'
            key={element.episode_id}>
            <img src={element.details.poster} alt="" />
            <h1>
              {element.title}
            </h1>
            <h4>On the Westenscale: {element.details.w}</h4>
            <Link to={`/episodes/${element.episode_id}`}>
              <div>
                <h2>Listen Now</h2>
              </div>
            </Link>
          </div>
        })}
      </Slider>
    </div>
  )
}

export default EpisodeCarousel