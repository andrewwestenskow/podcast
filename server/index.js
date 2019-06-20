require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const scaleController = require('./controllers/scaleController')
const userController = require('./controllers/usersController')
const movieController = require('./controllers/movieController')
const episodeController = require('./controllers/episodeController')


app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('Postgres set')
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})

app.get('/api/westenscale', scaleController.getScale)
app.get('/api/5episodes', scaleController.get5Episodes)
app.post('/auth/register', userController.createUser)
app.post('/auth/login', userController.login)
app.delete('/auth/logout', userController.logout)
app.get('/auth/users', userController.checkLogin)
app.get('/movies', movieController.getMovies)
app.get('/details', movieController.getDetails)
app.post('/episode/numbered', episodeController.addNumberedEpisode)
app.post('/episode/special', episodeController.addSpecialEpisode)