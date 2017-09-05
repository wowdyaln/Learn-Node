exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index');
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'add store'})
}
 
exports.createStore = (req, res) => {
  res.json(req.body)
}