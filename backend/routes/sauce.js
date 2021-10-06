// Express de Node.js
const express = require('express');
const router = express.Router();

// Controleurs des routes sauces
const sauceCtrl = require('../controllers/sauce');

// Middlewares :
const multer = require('../middleware/multer-config');//Multher pour la gestion des images
const auth = require('../middleware/auth'); //authentifié l'utilisateur avant l'envoie
const checksauce = require('../middleware/checksauce'); //verification saisie de la sauce

//Les routes sauce:
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, checksauce, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router;