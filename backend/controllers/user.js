// Controllers/user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const User = require('../models/User');

// Créer un compter utlisateur
exports.signup = (req, res, next) => {
const cryptemail = cryptojs.HmacSHA512(req.body.email, 'TOKEN_SECRET').toString(cryptojs.enc.Base64);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: cryptemail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Connecter à un compte utilisateur
exports.login = (req, res, next) => {
const cryptemail = cryptojs.HmacSHA512(req.body.email, 'TOKEN_SECRET').toString(cryptojs.enc.Base64);
  User.findOne({ email: cryptemail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};