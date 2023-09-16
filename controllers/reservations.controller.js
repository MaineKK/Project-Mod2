const mongoose = require('mongoose');
const Reservation = require('../models/reservation.model');
const User = require('../models/user.model');
const Room = require('../models/room.model');

module.exports.showReservationPage = (req, res, next) => {
    const {checkInDate, checkOutDate, roomId} = req.query
    const user = req.user;
    Room.findById(roomId)
    .then((room) => {
      if (!room) {
        return res.status(404).send('Habitación no encontrada');
      }
      res.render('reservation',{checkInDate, checkOutDate, user, room}); 
    })
    .catch(next);
  }; 
  
module.exports.createReservation = (req, res, next) => {
    const { checkOutDate, checkInDate, userId, roomId } = req.body;
    console.log(`roomId: ${roomId}`);
    const newReservation = new Reservation({
      checkOutDate,
      checkInDate,
      room: roomId, 
      user: req.user._id, 
     
    });
    newReservation.save()
      .then((reservation) => {
        console.log(`Created reservation: ${reservation}`);
        User.findByIdAndUpdate(userId, { $push: { reservations: reservation._id } })
          .then(() => {
          
            Room.findByIdAndUpdate(roomId, { $push: { reservations: reservation._id } })
              .then(() => {
                delete req.session.roomId;

                res.redirect('/confirmation');
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  };