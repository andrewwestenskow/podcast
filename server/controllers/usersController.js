const bcrypt = require('bcryptjs')

module.exports = {
  createUser: async (req, res) => {
    const db = req.app.get('db')

    try {
      const { username, password } = req.body

      let users = db.getUserByUsername([username])
      let user = users[0]

      if (user) {
        return res.status(401).send('username taken')
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      let response = await db.createUser([username, hash])

      let newUser = response[0]

      delete newUser.hash

      req.session.user = {
        username: newUser.username,
        isAuthenticated: true
      }

      return res.status(200).send(req.session.user)
    } catch (error) {
      return res.status(500).send('error creating user')
    }
  },

  login: async (req, res) => {
    const db = req.app.get('db')

    try {
      const { username, password } = req.body

      const tryUsers = await db.getUserByUsername([username])
      const tryUser = tryUsers[0]

      let isAuthenticated = bcrypt.compareSync(password, tryUser.hash)

      if (isAuthenticated) {
        delete tryUser.hash
        req.session.user = {
          username,
          isAuthenticated
        }

        res.status(200).send(req.session.user)
      } else {
        res.status(401).send('incorrect username or password')
      }
    } catch (error) {
      res.status(500).send('Error logging in')
    }
  }
}