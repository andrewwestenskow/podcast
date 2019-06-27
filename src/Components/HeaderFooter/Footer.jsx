import React from 'react'
import mdbattribute from '../../Assets/mdbattribute.png'
import apple from '../../Assets/apple.svg'
import spotify from '../../Assets/spotify.png'
import youtube from '../../Assets/youtube.png'

const Footer = () => (
  <footer className='footer'>
    <div className="subscription-icons-hold">
      <a href='https://podcasts.apple.com/us/podcast/we-watch-movies-and-then-talk-about-them/id1414038587?mt=2'><img alt='Listen on apple podcasts' src={apple} /></a>
      <a href='https://open.spotify.com/show/6nXO72xiaZo3oQxvfYwSAN'><img alt='Listen on Spotify' src={spotify} /></a>
      <a href='https://play.google.com/music/listen?u=0#/ps/Iqc5qb7aade7k54doenojoehpf4&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-mu-PartBadge-Mar2515-1'><img alt='Listen on Google Play Music' src='https://play.google.com/intl/en_us/badges-music/images/badges/en_badge_web_music.png' /></a>
      <a href='https://www.youtube.com/channel/UCGD72bphFb7zYnDc7dyNlyg'><img alt='Listen on YouTube' src={youtube} /></a>

    </div>
    <img src={mdbattribute} alt="Powered by the Movie Database" />
  </footer>
)

export default Footer

