var express = require('express')
var router = express.Router()
const sql = require('./bdd')

// Accès à la bdd avec sql.base. ...
// J'ai fait une fonction dans bdd.js pour simplifier tout il faut la tester aussi jsp si ca marche
// Pour l'utiliser:

/*

sql.request("FROM * IN AEZIOEZI").then((result) => {
    // Résultat de la requete ici;
})

 */

router.post("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"})
    //TODO: envoyer requete avec l'utilisateur (et token?) correspondant pour actualiser toute les données
    // Les données envoyées sont stockées sout forme json dans user.js donc il faudra faire la requete avec par
    // ex: firstName=user.profile.firstName lastName=user.profile.lastName ...
});

router.post("/signIn", (req, res) => {
    let data = req.body

    //TODO: vérifier si password1 et 2 pareil et username/password respectent conditions puis envoyer a la bdd
    // et check si ligne bien créé puis renvoyer la ligne avec registered=true
    // (pas oublier de hasher le mdp avant envoi a la bdd)

    // EXEMPLE REQUETE NON FINIT
    /*var request = new sql.base.Request();
    // query to the database and get the records
    */

    data.registered = true
    res.json(data)
});

router.post("/login", (req, res) => {
    let data = req.body // (temporaire) -> Changer avec le contenu de la requete une fois fait bdd



    //TODO: check si utilisateur avec username+password connecté
    // Si valide enregistrer ces données dans User.profile sous la bonne forme json
    // Si non valide changer data.logged et data.reason
    // (pas oublier de hasher le mdp avant envoi a la bdd)

    data.logged = true // TRUE OU FALSE SI CONNECTE OU NON CONNECTE
    data.reason = "" // CONTIENT LE MESSAGE A AFFICHER EN NOTIF SI UTILISATEUR OU MDP NON VALIDE (donc a modifier si erreur avec bdd)
    res.json(data)
});

router.post("/logout", (req, res) => {
    let data = req.body

    //TODO: Virer le token?

    data.logged = false
    res.json(data)
});

module.exports = router