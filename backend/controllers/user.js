// Controllers User.js

const bcrypt = require('bcrypt'); //Packade de chiffrement et haschage du mot de passe 
const jwt = require('jsonwebtoken');//Package de token d'authentification
const cryptojs = require('crypto-js');////Packade de chiffrement d'email

// Import du modèle User
const User = require('../models/User');

// Créer un compter utlisateur
exports.signup = (req, res, next) => {
  // Chiffrement de l'email 
  const cryptemail = cryptojs.HmacSHA512(req.body.email, 'TOKEN_SECRET').toString(cryptojs.enc.Base64);
  bcrypt.hash(req.body.password, 10)//Hachage du mot de passe
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
  // Chiffrement de l'email afin de le comparer avec la base de donnée
  const cryptemail = cryptojs.HmacSHA512(req.body.email, 'TOKEN_SECRET').toString(cryptojs.enc.Base64);
  User.findOne({ email: cryptemail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)// comparaison de hashage du mot de passe
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              { expiresIn: '24h' } // Durée d'attribution du token d'authentification qui expire dans 24h
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};