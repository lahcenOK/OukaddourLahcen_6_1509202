//vérification de l'ajout d'une nouvelle sauce

module.exports = (req, res, next) => {
    //regex
    const regexnam = /[a-zA-Z0-9_.,'’(Ééèçàû)\s]{3,50}$/;
    const regexdescription = /[a-zA-Z0-9_.\s]{3,300}$/;
    const regexheat = /^([1-9]|10)$/;
   
    const sauceObject = JSON.parse(req.body.sauce);

    // condition du Regex 
    if (!regexnam.test(sauceObject.name) || !regexnam.test(sauceObject.manufacturer) ||
       !regexdescription.test(sauceObject.description) || !regexnam.test(sauceObject.mainPepper) ||
        !regexheat.test(sauceObject.heat)) {
            return res.status(500).json({ error: 'la  saisie des champs doit être supérieur à trois caractères!' });
        }else {
            next();
        }
};


