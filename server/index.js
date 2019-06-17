require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const scaleController = require('./controllers/scaleController')


app.use(express.json())

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('Postgres set')
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})

app.get('/api/westenscale', scaleController.getScale)