const express = require('express');

const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const app = express();

app.use((req, res) => {
   res.json({ message: ' Requête reçue !' }); 
});

mongoose.connect('mongodb+srv://jsuser:Juser@cluster0.vihry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api/auth', userRoutes);
module.exports = app;