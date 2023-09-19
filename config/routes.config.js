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
router.get('/select/:roomId', rooms.selectRoom);

router.get('/reservation', reservations.showReservationPage);
router.post('/reservation', reservations.createReservation);

router.get('/confirmation', (req, res) => {
  res.render('confirmation'); 
});
router.get('/payment', (req, res) => {
    res.render('payment'); 
});
router.post('/processPayment', payments.processPayment);

router.get('/aboutUs', (req, res) => { 
  res.render('aboutUs');
});
router.get('/winery', (req, res) => { 
  res.render('winery');
});

router.get('/contact', (req, res) => { 
  res.render('contact');
});




module.exports = router;
