const mongoose = require('mongoose')

exports.loginForm = (req, res) => {
  res.render('login', {title: 'Login'})
}

exports.registerForm = (req, res) => {
  res.render('register', {title: 'Register'})
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name') // Same as req.sanitize(field[, message]), but only sanitizing req.body.
  req.checkBody('name', 'you must supply a name').notEmpty()
  // Same as req.check(field[, message]), but only checking req.body
  // Legacy Validation Chain --> .notEmpty
  req.checkBody('email', 'that Email is not Valid').isEmail() // https://github.com/chriso/validator.js#validators
  req.sanitizeBody('email').normalizeEmail({  // https://github.com/chriso/validator.js#sanitizers
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'password cannot be blank!').notEmpty()
  req.checkBody('password-confirm', 'confirm password cannot be blank').notEmpty()
  req.checkBody('password-confirm', 'Noo... your passwords do not match').equals(req.body.password)
  //https://github.com/chriso/validator.js#validators

  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', {title: 'Register', body: req.body,
      flashes: req.flash() })
  return; //stop the function running
  }

  next(); // there were no errors
}
