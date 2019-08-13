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
  },

  fetchHeader: async (req, res) => {
    const db = req.app.get('db')

    let episodes = await db.getEpisodeNames()
    let sortArr = episodes.sort((a, b) => {
      if(a.episode_id < b.episode_id){
        return 1
      } else {
        return -1
      }
    })

    res.status(200).send(sortArr.splice(0, 5))
  },

  fetchHome: async (req, res) => {
    const db = req.app.get('db')

    const scale = await db.getScale()

    scale.sort((a, b) => {
      if (a.w < b.w) {
        return 1
      } else {
        return -2
      }
    }).splice(19, Infinity)

    const [episodesCount] = await db.countEpisodes()

    let fiveEpisodesId = []

    while (fiveEpisodesId.length < 5) {
      let num = Math.floor(Math.random() * episodesCount.count)
      if (fiveEpisodesId.indexOf(num) === -1) {
        fiveEpisodesId.push(num)
      }
    }

    let randomEpisodes = await db.getFiveRandomEpisodes(
      fiveEpisodesId[0],
      fiveEpisodesId[1],
      fiveEpisodesId[2],
      fiveEpisodesId[3],
      fiveEpisodesId[4]
    )

    randomEpisodes.forEach(element => {
      let newDetails = JSON.parse(element.details)
      element.details = newDetails
    })

    let randomToSend = randomEpisodes.map(element => {
      return {
        poster: element.details.poster,
        title: element.title,
        w: element.details.w,
        episode_id: element.episode_id
      }
    })
    res.status(200).send({scale, randomToSend})
  },

  fetchEpisodeList: async (req, res) => {
    const db = req.app.get('db')
    const {page} = req.query

    let episodes = await db.getEpisodes()

    episodes.sort((a, b) => {
      if(a.episode_id < b.episode_id){
        return 1
      } else {
        return -1
      }
    })

    const numPages = Math.ceil(episodes.length /10)
    let pages = []

    for(let i = 0; i <numPages; i++){
      pages.push(episodes.splice(0, 10))
    }

    let toSend = pages[page].map(element => {
      const newDetails = JSON.parse(element.details)
      return {
        episode_id: element.episode_id,
        title: element.title,
        episodenumber: element.episodenumber,
        w: newDetails.w,
        player: newDetails.player,
        author: newDetails.author,
        review: newDetails.review,
        poster: newDetails.poster
      }
    })


    res.status(200).send({episodes: toSend, numPages})
  },

  fetchEpisode: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.query
    let [episode] = await db.getEpisodeByEpisodeId(+id)
    const newDetails = JSON.parse(episode.details)
    episode.details = newDetails

    res.status(200).send(episode)
  }
}