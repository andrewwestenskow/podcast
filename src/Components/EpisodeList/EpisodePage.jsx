import React, { Component } from 'react'
import NumberedEpisodeList from './NumberedEpisodeList'
import SpecialEpisodeList from './SpecialEpisodeList'


class EpisodePage extends Component {
  render() {
    return (
      <div>
        {this.props.episodes.map(element => {
            if (element.episodenumber) {
              return <NumberedEpisodeList key={element.episode_id} element={element}/>
            } else {
              return <SpecialEpisodeList key={element.episode_id} element={element}/>
            }
            
          })}
      </div>
    )
  }
}
export default EpisodePage
