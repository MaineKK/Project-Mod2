const Room = require('../models/room.model');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Reservation = require('../models/reservation.model');

module.exports.renderRoomList = (req, res) => { 
  const userId = req.session.userId;
  console.log(userId)
  Room.find()
    .then((rooms) => {
      res.render('rooms/list', { rooms, userId });
    })
    .catch((error) => {
      console.error(error);
      
      res.status(500).send('Error al obtener la lista de habitaciones');
    });
};

module.exports.selectRoom = (req, res, next) => {
  const roomId= req.params.roomId;
  const userId = req.user._id;
  Room.findById(roomId)
    .then((room) => {
      if (!room) {
        return res.status(404).send('Habitación no encontrada');
      }
      User.findByIdAndUpdate(userId, { $push: { reservations: room._id } })
        .then(() => {
          // Configura req.session.selectedRoomId aquí
          req.session.roomId = roomId;
          console.log(`Selected Room ID: ${req.session.roomId}`);
          res.redirect('/reservation');
          
        })
        .catch(next);
    })
    .catch(next);
};




