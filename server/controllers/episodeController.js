module.exports={
  addNumberedEpisode: async (req, res) => {
    const db = req.app.get('db')

    let details = JSON.stringify(req.body)

    let obj = JSON.parse(details)

    console.log(obj)
  }
}