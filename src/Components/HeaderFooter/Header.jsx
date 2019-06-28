import React, { Component } from 'react'
import BiggerMovies from '../../Assets/bigger_movies.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer'
import {fetchData} from '../../ducks/reducer'
import {connect} from 'react-redux'


class Header extends Component {

  state = {
    fiveEpisodes: []
  }

  async componentDidMount() {
    let fiveEpisodes = await axios.get('/api/5episodes')
    this.props.fetchData(fiveEpisodes.data)
    this.setState({
      fiveEpisodes: fiveEpisodes.data
    })
  }

  render() {
    return (
      <>
        <header className='header'>
          <img src={BiggerMovies} alt="We watch podcast" className='header-logo' />
          <nav className='navbar'>
            <Link to='/'>
              <h1 className='navlink'>Home</h1>
            </Link>
            <Link to='/about'>
              <h1 className='navlink'>About</h1>
            </Link>
            <div className='dropdown'>
              <Link to='/episodes/list'>
                <h1 className='navlink'>
                  Episodes
              </h1>
              </Link>
              <div className='dropdown-content'>
                {this.state.fiveEpisodes.map(element => (
                  <Link key={element.episode_id} to={`/episodes/${element.episode_id}`}>
                    <h1 className='navlink'>
                      {element.title}
                    </h1>
                    <div className="white-line"></div>
                  </Link>
                ))}
                <Link to='/episodes/list'>
                  <h1 className='navlink'>
                    All episodes...
                  </h1>
                </Link>
              </div>
            </div>
            <Link to='/blog'>
              <h1 className='navlink'>Blog</h1>
            </Link>
            <Link to='/contact'>
              <h1 className='navlink'>Contact</h1>
            </Link>
          </nav>
        </header>
        <>
          {this.props.children}
        </>
        <Footer />
      </>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {fetchData})(Header)