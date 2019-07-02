import React, { Component } from 'react'
import axios from 'axios'

class BlogListHold extends Component {

  state = {
    blogs: [],
    loading: true
  }

  async componentDidMount() {
    let blogs = await axios.get('/api/blogs')
    this.setState({
      blogs: blogs.data,
      loading: false
    })
  }


  render() {

    return (
      <div className="EpisodeList">
        {this.state.loading ? <div>Loading...</div> :
          <div className="episode-list-hold">
            <h1>Blog Posts:</h1>
          </div>
        }
      </div>
    )
  }
}

export default BlogListHold