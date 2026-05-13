const express = require('express');
const router = express.Router();
const { showProfile, getProfile, updateProfile, updatePassword } = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');

// Halaman profile (view)
router.get('/', isAuthenticated, showProfile);

// API endpoints
router.get('/api/profile', isAuthenticated, getProfile);
router.put('/api/profile', isAuthenticated, updateProfile);
router.put('/api/profile/password', isAuthenticated, updatePassword);

module.exports = router;
