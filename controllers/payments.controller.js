const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');


module.exports.processPayment = (req, res, next) => {
  const { cardHolderName, cardNumber, expirationDate, cvv } = req.body;

  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }


  const newPayment = new Payment({
    cardHolderName,
    cardNumber,
    expirationDate, 
    cvv,
  });

  user.cardInfo = newPayment;

      
      return user.save();
    })

    .then(() => {
     
      res.redirect('/profile');
    })
    .catch((error) => {
      console.error('Error al procesar el pago:', error);
      if (error.errors) {
        const validationErrors = Object.values(error.errors).map((error) => error.message);
        res.render('payment', { errors: validationErrors });
      } else {
        next(error);
      }
    });
};