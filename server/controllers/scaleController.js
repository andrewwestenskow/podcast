module.exports = {
  getScale(req, res) {
    const db = req.app.get('db')
    db.getScale().then(result => {
      res.status(200).send(result)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  }
}