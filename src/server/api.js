var express = require('express')
var router = express.Router()
const sql = require('./bdd')
const sha1 = require('sha1');

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
    let data = req.body
    data.logged = false

    if(data.username.length <= 3 || data.password.length <= 3){
        data.reason = "Nom d'utilisateur ou mot de passe incorrect."
        res.json(data)
        return;
    }

    // Convert password
    data.password = sha1(data.password);

    sql.request(`SELECT * FROM \`Logins\` WHERE ID_LOGINS='${data.username}' AND MDP_LOGIN='${data.password}' LIMIT 1`).then((result) => {
        if(result.length > 0){ // non teste, pas sur que ca marche
            data = result[0]
            data.logged = true
            //TODO: enregistrer ces données dans User.profile sous la bonne forme json
        }
        else{
            data.reason = "Nom d'utilisateur ou mot de passe incorrect."
        }
        res.json(data)
    })
});

router.post("/logout", (req, res) => {
    let data = req.body

    //TODO: Virer le token?

    data.logged = false
    res.json(data)
});

module.exports = router