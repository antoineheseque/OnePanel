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

                    const utc1 = new Date(Date.UTC(userData.lastDate.getFullYear(), userData.lastDate.getUTCMonth(), userData.lastDate.getUTCDate(), userData.lastDate.getUTCHours(), userData.lastDate.getUTCMinutes(), userData.lastDate.getUTCSeconds()));
                    const utc2 = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000)

                    let futureDate = new Date(utc1.getTime());
                    futureDate.setDate(futureDate.getDate()+1)

                    console.log(utc1)
                    console.log(utc2)
                    console.log(futureDate)

                    if(futureDate.getDate() === utc2.getDate() && futureDate.getMonth() === utc2.getMonth() && futureDate.getFullYear() === utc2.getFullYear()){ // Si on est bien le jours suivant
                        request = "UPDATE \`dayStreak\` SET lastDate=CURRENT_TIMESTAMP, counter=? WHERE userID=?"
                        query = mysql.format(request, [userData.counter+1 , decoded.id]);
                        sql.request(query).then(function (result2) {
                            res.json({"daystreak":userData.counter+1})
                        })
                    } else if(utc1.getDate() === utc2.getDate() && utc1.getMonth() === utc2.getMonth() && utc1.getFullYear() === utc2.getFullYear()){ // Si on est le même jour
                        res.json({"daystreak":userData.counter})
                    }
                    else{ // Si on est un autre jour
                        request = "UPDATE \`dayStreak\` SET lastDate=CURRENT_TIMESTAMP, counter=0 WHERE userID=?"
                        query = mysql.format(request, [decoded.id]);
                        sql.request(query).then(function (result2) {
                            res.json({"daystreak":0})
                        })
                    }
                }else{
                    // Utilisateur inexistant, l'ajouter a la table
                    request = "INSERT INTO \`dayStreak\` (userID,lastDate, counter) VALUES (?,CURRENT_TIMESTAMP,0)"
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