const express = require ('express');
const router = express.Router();

const user = require ('../controllers/user.controller');

router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/profile', secure.isAuthenticated, users.profile);

module.exports = router;
