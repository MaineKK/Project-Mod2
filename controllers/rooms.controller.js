const Room = require('../models/room.model');
const mongoose = require('mongoose');
const User = require('../models/user.model');


module.exports.renderRoomList = (req, res) => {
  Room.find()
    .then((rooms) => {
      res.render('rooms/list', { rooms });
    })
    .catch((error) => {
      console.error(error);
      
      res.status(500).send('Error al obtener la lista de habitaciones');
    });
};

module.exports.selectRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  const userId = req.user._id;
  Room.findById(roomId)
    .then((room) => {
      if (!room) {
        return res.status(404).send('Habitación no encontrada');
      }
      User.findByIdAndUpdate(userId, { $push: { reservations: room._id } })
        .then(() => {
          res.redirect('/reservation');
        })
        .catch(next);
    })
    .catch(next); 
};

