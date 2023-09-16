const Reservation = require('../models/reservation.model');
const User = require('../models/user.model');
const Room = require('../models/room.model');


module.exports.createReservation = (req, res, next) => {
    const { checkOutDate, checkInDate, userId, roomId } = req.body;
    const selectedRoomId = req.session.selectedRoomId;

    const newReservation = new Reservation({
      checkOutDate,
      checkInDate,
      room: roomId, 
      user: req.user._id, 
     
    });
  
    
    newReservation.save()
      .then((reservation) => {
        
        User.findByIdAndUpdate(userId, { $push: { reservations: reservation._id } })
          .then(() => {
          
            Room.findByIdAndUpdate(roomId, { $push: { reservations: reservation._id } })
              .then(() => {
                delete req.session.selectedRoomId;

                res.redirect('/confirmation');
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  };