// Express de Node.js
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');// Controleurs de routes utilisateur
const checksignup = require('../middleware/check-user-signup');//Middlewares de vérification inscription utilisateur

// Les routes utilisateur:
router.post('/signup', checksignup, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;