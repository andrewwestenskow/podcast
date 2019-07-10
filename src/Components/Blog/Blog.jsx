import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import ReactHTMLParser from 'react-html-parser'

class Blog extends Component {

  state = {
    loading: true,
    post: {}
  }

  async componentDidMount() {
    let blog = await axios.get(`/api/blog?id=${this.props.match.params.id}`)
    let details = JSON.parse(blog.data.details)
    blog.data.details = details
    this.setState({
      post: blog.data,
      loading: false
    })
  }

  render() {
    return (
      <div className="EpisodeList">
        {this.state.loading ? <div>Loading...</div> :
          <div className="episode-list-hold blog-post-hold">
            <h1>{this.state.post.title}</h1>
            <p>By: {this.state.post.author}</p>
            {ReactHTMLParser(this.state.post.details.post)}
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Blog)