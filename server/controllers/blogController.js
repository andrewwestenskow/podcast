module.exports = {
  createPost: async (req, res) => {
    const db = req.app.get('db')

    const {title, author, subject} = req.body
    const details = JSON.stringify(req.body)

    await db.createBlog([title, author, subject, details])

    res.status(200).send('okay')
  },

  getPosts: async (req, res) => {
    const db = req.app.get('db')

    let posts = await db.getBlogTitles()

    res.status(200).send(posts)
  },
  getPost: async (req, res) => {
    const db = req.app.get('db')
    const id = req.query

    let blog = await db.getBlog([+id.id])

    res.status(200).send(blog[0])
  },

  editPost: async (req, res) => {
    const db = req.app.get('db')
    const {blogs_id, title, author, subject} = req.body
    const details = JSON.stringify(req.body)

    await db.editBlog([blogs_id, title, author, subject, details])

    res.status(200).send('okay')
  }
}