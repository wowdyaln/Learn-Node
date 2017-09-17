const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

// https://github.com/saintedlama/passport-local-mongoose#simplified-passportpassport-local-configuration
passport.use(User.createStrategy()) // https://github.com/saintedlama/passport-local-mongoose#static-methods

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())