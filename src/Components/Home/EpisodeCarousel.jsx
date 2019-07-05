import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import fire from '../../Assets/fire.png'


const EpisodeCarousel = (props) => {

  const settings = {
    dots: false,
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
            {element.details.w && <div className="home-westenscale-hold">
              <h4>On the Westenscale: {element.details.w}</h4>
              {element.details.w >= 9 && <img src={fire} alt='fire'/>}
            </div>}
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