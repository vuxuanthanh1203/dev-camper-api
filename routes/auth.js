const express = require('express');
const { register, login, getCurrentUser, forgotPassword, updateDetails, updatePassword } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', protect, getCurrentUser);
router.put('/updatedetails', protect, updateDetails);
router.post('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);

module.exports = router;