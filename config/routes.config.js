const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const rooms = require('../controllers/rooms.controller');
const secure = require('../middlewares/secure.mid');
const payments = require('../controllers/payments.controller');
const reservations = require('../controllers/reservations.controller');
const extractIds = (req, res, next) => {
  req.userId = req.user._id; // Asegúrate de que req.user esté configurado correctamente
  req.roomId = req.params.roomId;
  next();
};

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
router.get('/select/:roomId',extractIds, rooms.selectRoom);

router.get('/reservation', reservations.showReservationPage);
router.post('/reservation', reservations.createReservation);

router.get('/confirmation', (req, res) => {
  res.render('confirmation'); 
});
router.get('/payment', (req, res) => {
    res.render('payment'); 
});
router.post('/processPayment', payments.processPayment);






module.exports = router;
