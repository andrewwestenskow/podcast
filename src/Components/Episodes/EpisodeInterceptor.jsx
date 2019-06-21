import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class EpisodeInterceptor extends Component {

  state = {
    data: {},
    loading: true
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = async () => {
    let details = await axios.get(`/api/episode?id=${this.props.match.params.episode_id}`)

    this.setState({
      data: details.data
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.episode_id !== this.props.match.params.episode_id){
      this.fetchData()
    }
  }

  render(){
    return(
      <>
      </>
    )
  }
}

export default withRouter(EpisodeInterceptor)