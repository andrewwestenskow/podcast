module.exports = {
  getScale(req, res) {
    const db = req.app.get('db')
    db.getScale().then(result => {
      res.status(200).send(result)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  },

  get5Episodes: async (req, res) => {
    const db = req.app.get('db')

    try {
      let episodes = await db.getEpisodes()
      
      let fiveEpisodes = episodes.filter(element => {
        if(element.number !== null){
          return element
        }
      }).sort((a, b) => {
        if(a.episode_id < b.episode_id){
          return 1
        } else {
          return -1
        }
      }).splice(0,5)

      res.status(200).send(fiveEpisodes)
    } catch (error) {
      res.status(500).send('Error getting episodes')
    }
  }
}