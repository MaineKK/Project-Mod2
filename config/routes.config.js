const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const rooms = require('../controllers/rooms.controller');
const secure = require('../middlewares/secure.mid');
const payments = require('../controllers/payments.controller');
router.get('/', (req, res) => {
    res.render('home'); 
  });

router.get('/register', users.register);
router.post('/Register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/profile', secure.isAuthenticated, users.profile);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/rooms', rooms.searchRooms)
router.get('/list', rooms.searchRooms);

router.get('/payment', (req, res) => {
    res.render('payment'); 
});
router.post('/processPayment', payments.processPayment);

router.get('/confirmation', (req, res) => {
  res.render('confirmation'); 
});

module.exports = router;
