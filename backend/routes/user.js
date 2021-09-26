const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const checksignup = require('../middleware/check-user-signup');

router.post('/signup', checksignup, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;