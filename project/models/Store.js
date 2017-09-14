const mongoose = require('mongoose')

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise     //http://mongoosejs.com/docs/promises.html

//https://www.npmjs.com/package/slugs
const slug = require('slugs')

//http://mongoosejs.com/docs/guide.html
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

// before save , do some function 
storeSchema.pre('save', async function (next) {  // http://mongoosejs.com/docs/api.html#schema_Schema-pre
  if (!this.isModified('name')) {    //http://mongoosejs.com/docs/api.html#document_Document-isModified
    next(); //skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name)
  // find other stores that have the same slug; if do, rename their slug
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i') //ignore case
  const storeWithSlug = await this.constructor.find({ slug: slugRegex })   //http://mongoosejs.com/docs/api.html#model_Model.find
                              //^^^不能用 Store.find() 因為 Store 還沒生成
  if(storeWithSlug.length > 0) {
    this.slug = `${this.slug}-${storeWithSlug.length + 1}`
  }
  next()
  // to make more resilient so slugs are unique
})


storeSchema.statics.getTagsList = function () { //Adding static methods to a Model. http://mongoosejs.com/docs/guide.html
  return this.aggregate([  //http://mongoosejs.com/docs/api.html#model_Model.aggregate
    { $unwind: '$tags' }, //https://docs.mongodb.com/manual/aggregation/#aggregation-framework
    { $group: { _id: '$tags', count: { $sum: 1 } } }, // https://docs.mongodb.com/manual/reference/operator/aggregation/#stage-operators
    { $sort: { count: -1}}
  ])
}

module.exports = mongoose.model('Store', storeSchema)