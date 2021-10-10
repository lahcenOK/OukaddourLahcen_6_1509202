// controllers/sauce.js
const Sauce = require('../models/sauce');
const fs = require('fs');// Package pour la suppression sauce

//créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //suppression de l'id généré par le front-end
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};
// afficher une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      //modification des données et rajout d'une nouvelle image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};
// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      //récupération de l'url correspondant à la sauce 
      const filename = sauce.imageUrl.split('/images/')[1];
      //unlink du package fs pour supprimer ce fichier
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
// Afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

 // Like / Dislike  une sauce
  exports.likeDislike = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        //si c'est un like 
        if (req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId }
            })
            .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }))
        }
        //si c'est un dislike 
         if (req.body.like === -1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {

          Sauce.updateOne({ _id: req.params.id },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId }
            })
            .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
        }
         if (req.body.like === 0) {
          //si c'est une annulation d'un like 
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 }
              })
              .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
          }
          //si c'est une annulation d'un dislike
          else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 }
              })
              .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
          }
          else {
            res.status(200).json({ message: 'Données Non Valide' });
            console.log("Erreur");
          }

        }
        else {
          res.status(200).json({ message: 'Données Non Valide' });
          console.log("Erreur");
        }
      })
      .catch(error => res.status(500).json({ error }));
  }
