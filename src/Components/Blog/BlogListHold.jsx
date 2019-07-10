import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class BlogListHold extends Component {

  state = {
    blogs: [],
    loading: true
  }

  async componentDidMount() {
    let blogs = await axios.get('/api/blogs')
    blogs.data.forEach(element => {
      let newDetails = JSON.parse(element.details)
      element.details = newDetails
    })
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
            {this.state.blogs.map(element => {
              return <div key={element.blogs_id} className='episode-list-item'>
                <Link to={`/blog/${element.blogs_id}`}><h1>
                  {element.title}
                </h1></Link>
                <p>By: {element.author}</p>
                
              </div>
            })}
          </div>
        }
      </div>
    )
  }
}

export default BlogListHold