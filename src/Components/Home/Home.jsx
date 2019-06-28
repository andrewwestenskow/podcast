import React, { Component } from 'react'
import axios from 'axios'


class Home extends Component {

  state = {
    loading: true,
    scale: []
  }

  async componentDidMount() {
    let scale = await axios.get('/api/westenscale')
    scale.data.sort((a, b) => {
      if (a.w < b.w) {
        return 1
      } else {
        return -2
      }
    })
    this.setState({
      scale: scale.data,
      loading: false
    })
  }

  render() {
    return (
      <>
        <div className='Home'>
          <div className="hero-hold">
              <div className="hero-top">
                <h1>Join Andrew, Becca, and Syd</h1>
                <h1>on our journey to discover</h1>
                <h1>the best that cinema has to offer...</h1>
              </div>
              <div className="hero-bottom">
                <h1>Listen now</h1>
                <p>or</p>
                <h2>Check out all of our episodes</h2>
              </div>
          </div>
          <section className="home-section">
            <h2>The only podcast on the internet</h2>
            <h3>where we </h3>
            <h1>watch a movie</h1>
            <h3>and then</h3>
            <h1>talk about it</h1>
          </section>
          <div className="westenscale-hold">
            {this.state.loading ? <div>loading</div> :
              <ul>
                {this.state.scale.map(element => (
                  <li key={element.westenscale_id}>{element.title}</li>
                ))}
              </ul>}
          </div>
        </div>
      </>
    )
  }
}

export default Home