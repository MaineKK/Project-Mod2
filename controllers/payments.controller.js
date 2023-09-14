const Payment = require('../models/payment.model');
const mongoose = require('mongoose');


module.exports.processPayment = (req, res, next) => {
  const { cardHolderName, cardNumber, expirationDate, cvv } = req.body;

  
  const newPayment = new Payment({
    cardHolderName,
    cardNumber,
    expirationDate, 
    cvv,
  });

  
  newPayment
    .save()
    .then(() => {
     
      
      res.redirect('/confirmation');
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