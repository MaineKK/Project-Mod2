const User = require('../models/user.model');
const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');
const mongoose = require('mongoose');

module.exports.register = (req, res, next) => res.render('users/register');

module.exports.doRegister = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render('users/register', { 
          user: req.body, 
          errors: { 
            username: 'Username already exists' 
          } 
        })
      } else {
        return User.create(req.body)
          .then(() => {
            req.flash('data', JSON.stringify({ info: 'Please login in'}));
            res.redirect('/login')
          })
      }
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/register', { user: req.body, errors: error.errors })
      } else {
        next(error);
      }
    })
    
}

module.exports.login = (req, res, next) => res.render('users/login');

module.exports.doLogin = (req, res, next) => {

  function renderInvalidUsername() {
    res.render('users/login', {
      user: req.body,
      errors: {
        password: 'Invalid username or password'
      }
    })
  }
console.log(req)
  User.findOne({ username: req.body.username })
  .populate('reservations.room')
  .then((user) => {
    if (user) {
      user.checkPassword(req.body.password).then((match) => {
        if (match) {
          req.session.userId = user.id;
          // Verifica si el usuario tiene una reserva pendiente
          if (req.params.roomId) {
            console.log('Redirecting to /reservation');
            res.redirect('/reservation');
          } else {
            console.log('Redirecting to /profile');
            res.redirect('/profile');
          }
        } else {
          renderInvalidUsername();
        }
      });
    } else {
      renderInvalidUsername();
    }
  })
  .catch((error) => next(error));
};



module.exports.profile = (req, res, next) => {
  res.render('users/profile', { user: req.user })
}