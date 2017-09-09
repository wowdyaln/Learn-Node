const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'add store'})
}
 
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully created "${store.name}". care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  //1. query the database for a list of all stores.
  const stores = await Store.find()
  res.render('stores', { title: 'Stores', stores: stores})
}

exports.editStore = async (req, res) => {
  //1. find the store and given the ID
  const store = await Store.findOne({ _id: req.params.id})
  //2. confirm they are the owner of the store
  //3. render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store: store})
}

exports.updateStore = async (req, res) => {
  //1. find and update the store
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec()
  
  req.flash('success', `successfully updated <strong>${store.name}</strong>.
  <a href='/stores/${store.slug}'> View Store </a>`)

  //2. redirect them the store and tell them it worked
  res.redirect(`/stores/${store._id}/edit`)
}