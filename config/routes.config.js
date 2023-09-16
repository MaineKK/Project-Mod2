const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const rooms = require('../controllers/rooms.controller');
const secure = require('../middlewares/secure.mid');
const payments = require('../controllers/payments.controller');
const reservations = require('../controllers/reservations.controller');

router.get('/', (req, res) => {
    res.render('home'); 
  });

router.get('/register', users.register);
router.post('/Register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/profile', secure.isAuthenticated, users.profile);
router.post('/logout', (req, res) => {
  if (req.session) {
    
    req.session.destroy();
    res.redirect('/login');
  }
  
});

router.get('/list', rooms.renderRoomList);
router.get('/list', rooms.selectRoom);

router.get('/reservation', reservations.createReservation);
router.get('/confirmation', (req, res) => {
  res.render('confirmation'); 
});
router.get('/payment', (req, res) => {
    res.render('payment'); 
});
router.post('/processPayment', payments.processPayment);






module.exports = router;
