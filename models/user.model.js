const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const WORK_FACTOR = 12;
const Schema = mongoose.Schema;
const reservationSchema = require('./reservation.model');

EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    name: {
      type: String,
      required: 'User name is required'
    },
    
    email: {
      type: String,
      required: 'User email is required',
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, 'Invalid email format']
    },
    username: {
      type: String,
      required: 'User username is required',
      trim: true,
      unique: true,
      validate: {
        validator: function(value) {
          return !value.includes(' ')
        },
        message: 'Invalid username, username can not contains white spaces'
      }
    },
    password: {
      type: String,
      required: 'User password is required',
      minLength: [6, 'User password needs at least 6 chars']
    },
    
    dni: {
      type: String,
      required: 'User DNI is required'
    },
    address: {
      type: String,
      required: 'User address is required'
    },
    phone: {
      type: String,
      required: 'User phone number is required'
    },

    reservations: [{
      type: Schema.Types.ObjectId,
      ref: 'Reservation' 
    }],

  }, { timestamps: true });

  userSchema.pre('save', function(next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.hash(user.password, WORK_FACTOR)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((error) => next(error))
    } else {
      next();
    }
  });



  userSchema.methods.checkPassword = function(password){
    const user = this;
    return bcrypt.compare(password, user.password);

  } 
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
  
