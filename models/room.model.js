const mongoose = require ('mongoose');
const { checkOut } = require('../config/routes.config');
const Schema = mongoose.Schema;


const roomSchema = new Schema ({
    name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['doble', 'triple', 'suite'],
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image:{ 
        type: String, 
        enum: ['doble.jpg', 'triple.jpg', 'suite.jpg'],
        required: true,
      },

      availabilty: {
        type: Boolean,
      },
      checkIn: {
        type: Date,
      },
      checkOut: {
        type: Date,
      }
    });

    const Room = mongoose.model('Room', roomSchema);
    
    module.exports = Room;