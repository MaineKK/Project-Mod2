const Room = require('../models/room.model');
const mongoose = require('mongoose');

module.exports.searchRooms = (req, res, next) => {
  console.log("here")
    const checkOutDate = new Date ("2023-09-04")
    Room.find({ $or: [ { checkOut: { $lt: checkOutDate } }, { availabilty: true } ] })
 .then((availableRooms) => {
    console.log(availableRooms)
      res.render('rooms/list', { rooms: availableRooms });
    })
    .catch((error) => console.log(error));
};

