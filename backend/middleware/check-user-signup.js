// verification inscription utilisateur
module.exports = (req,res,next) => {
    
  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  if(regexemail.test(req.body.email)) {
      if(regexpassword.test(req.body.password)) {
          next();
      } else {
          res.status(400).json({ message: "Le mot de passe doit avoir 8 à 15 caractères,"
          +"Avec au moins : un chiffre, une majuscule, une minuscule et l'un des caractères spéciaux : @$!%*?&."});
      }
  } else {
      res.status(400).json({ message: "L'adresse email saisie n'est pas valide !"});
  }
}
