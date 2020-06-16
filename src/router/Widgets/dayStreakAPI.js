var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const sql = require('../../server/bdd');
const jwt = require("jsonwebtoken")

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getDayStreak", (req, res) => {

    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // Utilisateur invalide
        {
            console.log("Y'A UN PROBLEME")
        } else {
            //REQUETE DEMANDANT LE COUNTER ACTUEL ET LA DERNIERE DATE DE CONNEXION DE L'UTILISATEUR
            var request = "SELECT * from \`dayStreak\` WHERE userID=? LIMIT 1"
            var query = mysql.format(request, [decoded.id]);
            sql.request(query).then(function (result) {
                console.log(result)
                if(result.length > 0){
                    // Utilisateur existant, on compare les dates
                    var userData = result[0]
                    var currentDate = new Date()

                    const utc1 = Date.UTC(a.getFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
                    const utc2 = Date.UTC(b.getFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds());
                    let daysLate = Math.round((utc2 - utc1) / 1000 / 60)

                    let dateDiffInHours = dateDiffInHours(userData.lastDate, currentDate)
                    console.log(dateDiffInHours)
                }else{
                    // Utilisateur inexistant, l'ajouter a la table
                    request = "INSERT INTO \`dayStreak\` (userID,lastDate, counter) VALUES (?,CURRENT_TIMESTAMP,1)"
                    query = mysql.format(request, [decoded.id]);
                    sql.request(query).then(function (result2) {
                        console.log("success")
                        res.json({"daystreak":0})
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    })
})

module.exports = router