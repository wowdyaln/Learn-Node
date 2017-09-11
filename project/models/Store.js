const mongoose = require('mongoose')

//http://mongoosejs.com/docs/promises.html
// Tell Mongoose to use ES6 promises
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
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'you must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'you must supply an address!'
    }
  },
  photo: String
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

module.exports = mongoose.model('Store', storeSchema) 