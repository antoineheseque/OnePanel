var express = require('express')
var router = express.Router()
const sql = require('./bdd')
const bcrypt = require('bcrypt');

//TODO: AJOUTER ICI LES ROUTES POUR LES API WIDGETS
router.get("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"})
    //TODO: envoyer requete avec l'utilisateur (et token?) correspondant pour actualiser toute les données
    // Les données envoyées sont stockées sout forme json dans user.js donc il faudra faire la requete avec par
    // ex: firstName=user.profile.firstName lastName=user.profile.lastName ...
});

module.exports = router