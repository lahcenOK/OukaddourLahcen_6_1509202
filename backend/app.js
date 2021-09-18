const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
  

   app.use(bodyParser.json());

   app.post('/api/sauces', (req, res, next) => {
      console.log(req.body);
      res.status(201).json({
        message: 'sauce créé !'
      });
    });


   app.use('/api/sauces', (req, res, next) => {
   const sauce = [
      {
        name: ' premiere sauce',
        manufacturer: 'france',
        description: 'Les infos de premiere sauce',
        imageUrl: 'https://i.etsystatic.com/15659040/r/il/0c7aad/3062921757/il_1140xN.3062921757_pw9x.jpg',
        mainPepper: 'poivre',
        heat : 2,
                
      },
      ];
    res.status(200).json(sauce);
  });   
   
  
   app.use((req, res) => {
   res.json({ message: ' Requête reçue !' }); 
   });

app.use('/api/auth', userRoutes);
module.exports = app;
