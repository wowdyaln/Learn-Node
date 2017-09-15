const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  email: {
    type: String, //http://mongoosejs.com/docs/api.html#schema_Schema.Types
    unique: true, //  http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique
    lowercase: true, // http://mongoosejs.com/docs/api.html#schema_string_SchemaString-lowercase
    trim: true, //http://mongoosejs.com/docs/api.html#schema_string_SchemaString-trim
    validate: [validator.isEmail, 'invalid Email address'], //http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
    required: 'please supply an email address'   //http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
  },
  name: {
    type: String,
    required: 'please supply a name',
    trim: true
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'})
// http://mongoosejs.com/docs/api.html#schema_Schema-plugin
// https://github.com/saintedlama/passport-local-mongoose , 在 Main option 說明：
// usernameField: specifies the field name that holds the username. Defaults to 'username'. This option can be used if you want to use a different field to hold the username for example "email".
//  如此一來，用 name 或是 email 都可以當做 login id

userSchema.plugin(mongodbErrorHandler) // https://www.npmjs.com/package/mongoose-mongodb-errors
//如果噴錯，讓 mongodb 的 error 用比較漂亮的形式呈現給使用者

module.exports = mongoose.model('User', userSchema)