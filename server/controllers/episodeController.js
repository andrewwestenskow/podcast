module.exports={
  addNumberedEpisode: async (req, res) => {
    const db = req.app.get('db')

    const {title, episodeNumber, a, b, s, w} = req.body

    let details = JSON.stringify(req.body)

    await db.createNumberedEpisode(+episodeNumber, title, details, +b, +s, +a, +w)

    res.status(200).send('okay')
  },

  addSpecialEpisode: async (req, res) => {
    const db = req.app.get('db')

    const {title, episodeNumber} = req.body

    let details = JSON.stringify(req.body)

    await db.createSpecialEpisode(episodeNumber, title, details)

    res.status(200).send('okay')
  }
}