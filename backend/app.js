const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/user');


app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

mongoose.connect('mongodb+srv://jsuser:Juser@cluster0.vihry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
   useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));
   
  
   app.use((req, res) => {
   res.json({ message: ' Requête reçue !' }); 
   });

app.use('/api/auth', userRoutes);
module.exports = app;
