const Reservation = require('../models/reservation.model');


module.exports.createReservation = (req, res, next) => {
    const { checkOutDate, checkInDate, userId, roomId } = req.body;

    const newReservation = new Reservation({
      checkOutDate,
      checkInDate,
      room: roomId, 
      user: userId, 
     
    });
  
    
    newReservation.save()
      .then((reservation) => {
        
        User.findByIdAndUpdate(userId, { $push: { reservations: reservation._id } })
          .then(() => {
          
            Room.findByIdAndUpdate(roomId, { $push: { reservations: reservation._id } })
              .then(() => {
                res.redirect('/confirmation');
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  };