const express = require('express');
const router = express.Router();
const { showLogin, login, logout } = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');

router.get('/login', isGuest, showLogin);
router.post('/login', isGuest, login);
router.post('/logout', logout);

module.exports = router;
