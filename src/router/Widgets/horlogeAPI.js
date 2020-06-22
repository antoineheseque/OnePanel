var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
var mysql = require('mysql');
const jwt = require("jsonwebtoken")
const axios = require('axios');


///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getAPIHorloge", (req, res) => {


    let token = req.body.token
    var ville = req.body.city

    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ville}&key=93fd4bf9122142cba65a015d0a69c1a0`).then(function (r) {
                const horlo = r.data.results[0];

                res.json({"horloge": horlo})
            }).catch(function (result) {
                return false
            })
        }
    })
})





router.post("/getHorloge", (req, res) => {

    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT horloge_ville FROM \`horlogeMondiale\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {

                if (result[0] === undefined) { // BDD VIDE

                    var request3 = "INSERT INTO \`horlogeMondiale\` (userID) VALUE (?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3).then(function (result) {
                        res.json({"message":"succeed"})
                    })

                } else { //BDD NON VIDE

                    //ON VA CHERCHER LE TIMEDATA DE LA BDD ET ON LE RENVOIE
                    var request4 = "SELECT horloge_ville FROM \`horlogeMondiale\` WHERE userID=?"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4).then(function (result) {
                        res.json({"timedata": result})
                    })

                }
            })


        }
    })
})


router.post("/getHorloge2", (req, res) => {

    let token = req.body.token
    let time_Data = JSON.stringify(req.body.timeData)


    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT horloge_ville FROM \`horlogeMondiale\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {
                if (result.length > 0) { // BDD NON VIDE

                    var request2 = "UPDATE \`horlogeMondiale\` SET horloge_ville=?  WHERE userID=?"
                    var completeRequest2 = mysql.format(request2, [time_Data, decoded.id]);
                    sql.request(completeRequest2).then(function (result) {
                        res.json({"message":"succeed"})
                    })

                } else { //BDD VIDE
                    console.log("\nPROBLEME GetHorloge2")
                }
            })


        }
    })
})




module.exports = router