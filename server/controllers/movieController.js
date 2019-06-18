require('dotenv').config()
const {MOVIE_DB_KEY} = process.env
const axios = require('axios')

module.exports={
  getMovies: async (req, res) => {
    const {searchString} = req.query
    let results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_DB_KEY}&query=${searchString}`)
    res.status(200).send(results.data)
  },
  getDetails: async (req, res) => {
    const {id} = req.query
    let results = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_DB_KEY}&append_to_response=images,videos,credits`)
    res.status(200).send(results.data)
  }
}
