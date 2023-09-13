const Payment = require('../models/payment.model');
const mongoose = require('mongoose');


module.exports.processPayment = (req, res, next) => {
    const { nombre, apellido, numeroTarjeta, codigoCVV } = req.body;
  
    // Crea una nueva instancia de Payment con los datos del formulario
    const newPayment = new Payment({
      cardHolderName: nombre, // Asigna el nombre del titular de la tarjeta
      cardNumber: numeroTarjeta, // Asigna el número de tarjeta
      expirationDate: 'MM/YY', // Aquí debes asignar la fecha de vencimiento adecuada
      cvv: codigoCVV, // Asigna el código CVV
    });
  
    // Guarda la instancia de Payment en la base de datos
    newPayment.save()
      .then(() => {
        // Realiza cualquier otra lógica necesaria aquí
  
        // Redirige al usuario a una página de confirmación
        res.redirect('/confirmation');
      })
      .catch((error) => {
        console.error('Error al procesar el pago:', error);
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('payment', { errors: error.errors });
        } else {
          next(error);
        }
      });
  };
  