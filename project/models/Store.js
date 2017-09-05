const mongoose = require('mongoose')

//http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

//https://www.npmjs.com/package/slugs
const slug = require('slugs')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'plz enter a store name.'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
})

//http://mongoosejs.com/docs/api.html#schema_Schema-pre
// before save , do some function 
storeSchema.pre('save', function(next){
  if (!this.isModified('name')){
    next(); //skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name)
  next()
  // to make more resilient so slugs are unique
})