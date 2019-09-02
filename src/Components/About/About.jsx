import React, { Component } from 'react'
import BiggerMovies from '../../Assets/bigger_movies.png'


class About extends Component {
  render() {
    return (
      <div className='EpisodeList'>
        <div className="episode-list-hold">
          <h1>Who are we?</h1>
          <div className="episode-list-item">
            <img className='episode-list-poster' src={BiggerMovies} alt="" />
            <div className="episode-list-item-content">
              <div className="episode-list-item-content-1">
                <h2>We Watch Movies and then Talk About Them</h2>
                <h3>Our Mission: </h3>
              </div>
            </div>
          </div>
          <h1>Your hosts:</h1>
          <div className="episode-list-item">
            <img className='episode-list-poster' src={BiggerMovies} alt="" />
            <div className="episode-list-item-content">
              <div className="episode-list-item-content-1">
                <h2>Andrew Westenskow</h2>
                <h3>About Andrew: </h3>
              </div>
            </div>
          </div>
          <div className="episode-list-item">
            <img className='episode-list-poster' src={BiggerMovies} alt="" />
            <div className="episode-list-item-content">
              <div className="episode-list-item-content-1">
                <h2>Becca Westenskow</h2>
                <h3>About Becca: </h3>
              </div>
            </div>
          </div>
          <div className="episode-list-item">
            <img className='episode-list-poster' src={BiggerMovies} alt="" />
            <div className="episode-list-item-content">
              <div className="episode-list-item-content-1">
                <h2>Syd Bean</h2>
                <h3>About Syd: </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default About
