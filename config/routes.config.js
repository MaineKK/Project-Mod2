const express = require ('express');
const router = express.Router();

const users = require ('../controllers/user.controller');

router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);

module.exports = router;
