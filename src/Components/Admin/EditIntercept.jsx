import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import AuthHeader from './AuthHeader'
import EditNumbered from './EditNumbered'
import EditSpecial from './EditSpecial'

class EditIntercept extends Component {

  state = {
    episode: {},
    loading: true
  }

  async componentDidMount() {
    let episode = await axios.get(`/api/episode?id=${this.props.match.params.id}`)
    this.setState({
      episode: episode.data,
      loading: false
    })
  }

  render() {
    return (
      <>
        <AuthHeader />
        {this.state.loading ? <div>loading</div> :
          <>
            {this.state.episode.episodenumber ?
              <EditNumbered data={this.state.episode} /> :
              <EditSpecial data={this.state.episode}/>
            }
          </>}
      </>
    )
  }
}

export default withRouter(EditIntercept)