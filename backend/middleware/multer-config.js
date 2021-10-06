//package Multer pour gérer les fichiers (images) entrants
const multer = require('multer');

//format d'images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');// enregistrer les fichiers dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//remplacer les espaces par des underscores 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');