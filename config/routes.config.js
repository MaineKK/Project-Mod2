const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const rooms = require('../controllers/rooms.controller');


router.get('/register', users.register);
router.post('/doRegister', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);

router.get('/rooms', rooms.searchRooms)

module.exports = router;