var express = require('express')
var router = express.Router()
const sql = require('./bdd')
const bcrypt = require('bcrypt');
const format = require('fecha');
const jwt = require("jsonwebtoken")

// Accès à la bdd avec sql.base. ...
// J'ai fait une fonction dans bdd.js pour simplifier tout il faut la tester aussi jsp si ca marche
// Pour l'utiliser:

/* ENVOYER UNE REQUETE
sql.request("FROM * IN AEZIOEZI").then((result) => {
    // Résultat de la requete ici;
})
 */

/* CONVERTIR LE MDP LORS DE L'INSCRIPTION
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data.password, salt, function(err, hash) {

    });
});
 */

router.post("/updateProfile", (req, res) => {
    let data = req.body
    data.updated = false

    if(data.password.length <= 3){
        data.reason = "Le mot de passe doit faire plus de 3 caractères."
        res.json(data)
        return;
    }

    sql.request(`SELECT * FROM \`users\` WHERE id='${data.id}' LIMIT 1`).then((result) => {
        if(result.length > 0){ // SI UN UTILISATEUR CORRESPONDS ON COMPARE LES MDP
            bcrypt.compare(data.password, result[0].password, function(err, comparePassword){ // COMPARAISON AVEC LE MOT DE PASSE STOCKE EN BASE DE DONNEE
                if(err) console.log(err)
                else if (comparePassword) { // LES MOTS DE PASSE SONT BON

                    // FORMAT DATE
                    let date = format.format(new Date(data.birthdayDate), 'isoDate')
                    console.log(date)


                    // ON MET A JOUR LA TABLE
                    sql.request(`UPDATE \`users\` SET username='${data.username}', email='${data.email}', firstName='${data.firstName}', lastName='${data.lastName}', birthdayDate='${date}' WHERE id='${data.id}'`).then((result) => {
                        data.updated = true
                        data.password = ""
                        res.json(data)
                    }).catch((err) => {
                        if(err.code === "ER_DUP_ENTRY"){
                            data.reason = "Ce nom d'utilisateur existe déjà."
                        }else{
                            data.reason = "Un problème est survenu dans la BDD: ." + err.sqlMessage
                        }
                        res.json(data)
                    });
                } else {
                    data.reason = "Mot de passe incorrect."
                    res.json(data)
                }
            });
        }
        else {
            data.reason = "Utilisateur inexistant."
            res.json(data)
        }
    }).catch((err) => {
        console.log("Un problème est survenu dans la BDD")
        console.log(err)
    });
});

router.post("/signIn", (req, res) => {
    let data = req.body
    data.registered = false

    // ON VERIFIE LES CONDITIONS
    if(data.username.length <= 3){
        data.reason = "Le nom d'utilisateur doit faire plus de 3 caractères."
        res.json(data)
        return;
    }
    if(data.password.length <= 5 || data.password2.length <= 5){
        data.reason = "Le mot de passe doit faire plus de 5 caractères."
        res.json(data)
        return;
    }
    if(data.password !== data.password2){
        data.reason = "Les mots de passe ne sont pas identique."
        res.json(data)
        return;
    }

    // ON INSCRIT L'UTILISATEUR (ON SAURA SI L'UTILISATEUR EXISTE DEJA AVEC LA REPONSE DE LA REQUETE
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            sql.request(`INSERT INTO \`users\` (username, password) VALUES ('${data.username}', '${hash}')`).then((result) => { // ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN
                if(result.affectedRows === 1)
                    data.registered = true
                else
                    data.reason = "Un problème est survenu."
                res.json(data)
            }).catch((err) => {
                if(err.code === 'ER_DUP_ENTRY')
                    data.reason = "Ce nom d'utilisateur existe déjà."
                else
                    data.reason = "Un problème est survenu."
                res.json(data)
            });
        });
    });
});

router.post("/login", (req, res) => {
    let data = req.body
    data.logged = false

    if(data.username.length < 3 || data.password.length <= 3){
        data.reason = "Nom d'utilisateur ou mot de passe incorrect."
        res.json(data)
        return;
    }

    sql.request(`SELECT * FROM \`users\` WHERE username='${data.username}' LIMIT 1`).then((result) => {
        if(result.length > 0){ // SI UN UTILISATEUR CORRESPONDS ON COMPARE LES MDP
            bcrypt.compare(data.password, result[0].password, function(err, comparePassword){ // COMPARAISON AVEC LE MOT DE PASSE STOCKE EN BASE DE DONNEE
                if(err) console.log(err)
                else if (comparePassword) { // LES MOTS DE PASSE SONT BON
                    data = result[0]
                    data.logged = true
                    sql.request(`INSERT INTO \`logins\` (userID) VALUES ('${data.id}')`).then(() => { // ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN

                        const token = jwt.sign({ id: data.id }, process.env.SECRET_JWT,{ algorithm: "HS256", expiresIn: '7200s' });

                        data.token = token
                        res.json(data);

                    }).catch((err) => {
                        console.log("Un problème est survenu dans la BDD")
                        console.log(err)
                    });

                } else {
                    data.reason = "Nom d'utilisateur ou mot de passe incorrect."
                    res.json(data)
                }
            });
        }
        else {
            data.reason = "Nom d'utilisateur ou mot de passe incorrect."
            res.json(data)
        }
    }).catch((err) => {
        console.log("Un problème est survenu dans la BDD")
        console.log(err)
    });
});

router.post("/verifyToken", (req, res) => {
    let token = req.body.token
    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if(decoded === undefined)
            res.json({'isVerified':"false"})
        else
            res.json({'isVerified':"true"})
    });
});

module.exports = router