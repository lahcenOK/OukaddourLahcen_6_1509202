// Base de données Mongoose
const mongoose = require('mongoose');

//plugin pour vérifier que deux utilisateurs ne peuvent pas partager la même adresse e-mail.
const uniqueValidator = require('mongoose-unique-validator');

// Schema données utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);