module.exports ={
  fetchData: async (req, res) => {
    const db = req.app.get('db')

    let episodes = await db.getEpisodes()
    episodes.forEach(episode => {
      let newData = JSON.parse(episode.details)
      episode.details = newData
    })
    let scale = await db.getScale()

    let data = {
      episodes,
      scale
    }

    res.status(200).send(data)
  }
}