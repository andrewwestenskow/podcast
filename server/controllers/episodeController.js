module.exports={
  addNumberedEpisode: async (req, res) => {
    const db = req.app.get('db')

    const {title, episodeNumber, a, b, s, w} = req.body

    let details = JSON.stringify(req.body)

    await db.createNumberedEpisode(+episodeNumber, title, details, +b, +s, +a, +w)

    let ids = await db.getEpisodeId(+episodeNumber)
    let id = ids[0].episode_id

    await db.setWestenscaleId(+id, +episodeNumber)

    res.status(200).send('okay')
  },

  editNumberedEpisode: async (req, res) => {
    const db = req.app.get('db')
    const {title, episodeNumber, episode_id, a, b, s, w} = req.body
    let details = JSON.stringify(req.body)

    await db.editNumberedEpisode(episode_id, episodeNumber, title, details, a, b, s, w)

    res.status(200).send('okay')
  },

  addSpecialEpisode: async (req, res) => {
    const db = req.app.get('db')

    const {title, episodeNumber} = req.body

    let details = JSON.stringify(req.body)

    await db.createSpecialEpisode(episodeNumber, title, details)

    res.status(200).send('okay')
  },

  editSpecialEpisode: async (req, res) => {
    const db = req.app.get('db')
    const {title, episode_id} = req.body
    let details = JSON.stringify(req.body)
    await db.editSpecialEpisode(episode_id, title, details)

    res.status(200).send('okay')
  },
  
  getAllEpisodes: async (req, res) => {
    const db = req.app.get('db')

    const data = await db.getEpisodes()

    res.status(200).send(data)
  }
}