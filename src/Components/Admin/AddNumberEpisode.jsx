import React, {Component} from 'react'
import axios from 'axios'
import AuthHeader from './AuthHeader'
import {withRouter} from 'react-router-dom'

class AddNumberEpisode extends Component {

  state={
    loading: true,
    crew: [],
    cast: [],
    details: {},
    poster: '',
    posterNumber: 0,
    backdrop: '',
    backdropNumber: 0
  }

  async componentDidMount(){
    const {id} = this.props.match.params
    let results = await axios.get(`/details?id=${id}`)
    // eslint-disable-next-line
    const crew = results.data.credits.crew.filter(element => {
      if(element.job === 'Director' || element.job === 'Writer' || element.job === 'Director of Photography' || element.job === 'Original Music Composer'){
        return element
      }
    })
    const cast = results.data.credits.cast.splice(0,5)
    this.setState({
      details: results.data,
      loading: false,
      crew: crew,
      cast: cast
    })
  }

  render(){
    const{details} = this.state

    return(
      <>
      <AuthHeader/>
      <div className="AddNumberEpisode">
        <section className="column">
          <h1>Movie details</h1>
          <h2>{details.original_title}</h2>
          <p>{details.release_date}</p>
          <p>Runtime: {details.runtime} minutes</p>
          <p>Crew:</p>
          <ul>
            {this.state.crew.map(element => {
              return <li key={element.credit_id}>{element.job}: {element.name}</li>
            })}
          </ul>
          <p>Cast:</p>
          <ul>
            {this.state.cast.map(element => {
              return <li key={element.credit_id}>
                {element.character}: {element.name}
              </li>
            })}
          </ul>

        </section>
        <section className="column"></section>
        <section className="column"></section>
      </div>
      </>
    )
  }
}

export default withRouter(AddNumberEpisode)