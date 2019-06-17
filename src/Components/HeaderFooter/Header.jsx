import React from 'react'
import Footer from './Footer'
import BiggerMovies from '../../Assets/bigger_movies.png'
import {Link} from 'react-router-dom'


const Header = (props) => {

  return(
    <>
    <header className='header'>
      <img src={BiggerMovies} alt="We watch podcast" className='header-logo'/>
      <nav className='navbar'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Episodes</h1>
        <h1>Blog</h1>
        <h1>Contact</h1>
      </nav>
    </header>
    <div>
      {props.children}
    </div>
    <Footer/>
    </>
  )
}

export default Header