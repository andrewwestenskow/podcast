import React, { Component } from 'react'
import Footer from '../HeaderFooter/Footer'
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
            <div className="hero-left">
              <h2>The only podcast on the internet</h2>
              <h3>where we </h3>
              <h1>watch a movie</h1>
              <h3>and then</h3>
              <h1>talk about it</h1>
            </div>
            <div className="hero-right">
              <h1>Subscribe now</h1>
              <h4>...you know you want to</h4>
            </div>
          </div>
          <div className="westenscale-hold">
            {this.state.loading ? <div>loading</div> :
              <ul>
                {this.state.scale.map(element => (
                  <li key={element.westenscale_id}>{element.title}</li>
                ))}
              </ul>}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home