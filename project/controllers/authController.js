const passport = require('passport')

exports.login = passport.authenticate('local', { //http://passportjs.org/docs/authenticate
  failureRedirect: '/login',
  failureFlash: 'failed login !',
  successRedirect: '/',
  successFlash: 'you are now logged in !',
})