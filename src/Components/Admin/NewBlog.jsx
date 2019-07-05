import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { modules } from '../../Assets/quillModules'
import AuthHeader from './AuthHeader'
import 'react-quill/dist/quill.snow.css'
import {tags} from './tags'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class NewBlog extends Component {

  state = {
    title: '',
    author: '',
    post: '',
    tags: '',
    subject: ''
  }

  async componentDidMount(){
    let users = await axios.get('/auth/users')
    if(users.data === 'okay'){
      return
    } else {
      this.props.history.push('/')
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePostChange = (value) => {
    this.setState({post: value})
  }

  submitBlog = async () => {
    let tags = this.state.tags.split(', ')
    tags.push(this.state.title, this.state.author, this.state.subject)
    tags.forEach(element => {
      return element.toLowerCase()
    })
    const blog = {
      title: this.state.title,
      author: this.state.author,
      post: this.state.post,
      subject: this.state.subject,
      tags: tags
    }
    
    let result = await axios.post('/api/blog', blog)

    if(result.data === 'okay'){
      alert('success')
      this.props.history.push('/admin/dashboard')
    }
  }

  addTags = (type) => {
    let tags = this.state.tags
    let newTags = `${tags}${type.tags}`
    this.setState({
      tags: newTags
    })
  }

  render() {
    return (
      <>
        <AuthHeader />
        <div className='NewPost'>
          <p>Title</p>
          <input autoComplete='off' onChange={(e) => this.handleChange(e)} type="text" name='title' value={this.state.title} />
          <p>Subject Film</p>
          <input autoComplete='off' type="text" onChange={(e) => this.handleChange(e)} name='subject' value={this.state.subject} />
          <p>Author</p>
          <input autoComplete='off' onChange={(e) => this.handleChange(e)} type="text" name='author' value={this.state.author} />
          <ReactQuill onChange={this.handlePostChange} value={this.state.post} modules={modules} className='number-quill' theme='snow' />
          <p>Make your post searchable!  Add tags separated by a comma</p>

          <input autoComplete='off' style={{width: '50%'}} onChange={(e) => this.handleChange(e)} name='tags'  value={this.state.tags} type="text" />
          <p>Or add one of our predefined sets</p>
          <div className='new-post-button-hold'>{tags.map(element=>(
          <button onClick={()=>this.addTags(element)} key={element.name}>{element.name}</button>
          ))}</div>
          <button onClick={this.submitBlog}>Submit</button>
        </div>
      </>
    )
  }
}

export default withRouter(NewBlog)