var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
var mysql = require('mysql');
//const horlogerie =require('../../server/Widgets/horloge')
const jwt = require("jsonwebtoken")
const axios = require('axios');


/*fonction dans : src\server\Widgets\horloge

cherche à l'import dans: router\Widgets\horlogeAPI  => horlogerie = require("?");*/

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getAPIHorloge", (req, res) => {


    let token = req.body.token
    var ville = req.body.city
    console.log("\nville_getAPIHorloge=")
    console.log(ville)

    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ville}&key=93fd4bf9122142cba65a015d0a69c1a0`).then(function (r) {
                const horlo = r.data.results[0];
                console.log("\nhorlo=")
                console.log(horlo)

                res.json({"horloge": horlo})
            }).catch(function (result) {
                return false
            })
        }
    })
})





router.post("/getHorloge", (req, res) => {

    let token = req.body.token
    //let time_Data = req.body.timeData

    //console.log("\ntime_Data=")
    //console.log(time_Data)

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
                console.log("\nVERIF BDD VIDE?=")
                console.log(result[0])

                if (result[0] === undefined) { // BDD VIDE

                    console.log("\ngetHorloge BDD VIDE")

                    var request3 = "INSERT INTO \`horlogeMondiale\` (userID) VALUE (?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3).then(function (result) {
                        console.log("\nINSERTION BDD time_Data")
                        res.json({"message":"succeed"})
                    })

                } else { //BDD NON VIDE

                    //ON VA CHERCHER LE TIMEDATA DE LA BDD ET ON LE RENVOIE
                    var request4 = "SELECT horloge_ville FROM \`horlogeMondiale\` WHERE userID=?"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4).then(function (result) {
                        console.log("\nresult select horloge_ville=")
                        console.log(result)
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


    console.log("\ntime_Data=")
    console.log(time_Data)



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
                console.log("\nresult_select_horloge_ville _GetHorloge2")
                console.log(result)
                if (result.length > 0) { // BDD NON VIDE

                    var request2 = "UPDATE \`horlogeMondiale\` SET horloge_ville=?  WHERE userID=?"
                    var completeRequest2 = mysql.format(request2, [time_Data, decoded.id]);
                    sql.request(completeRequest2).then(function (result) {
                        console.log("\nUPDATE BDD time_Data")
                        res.json({"message":"succeed"})
                    })

                } else { //BDD VIDE
                    console.log("\nPROBLEME GetHorloge2")

                    /*var request3 = "INSERT INTO \`horlogeMondiale\` (userID,horloge_ville) VALUES (?,?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id, time_Data]);
                    sql.request(completeRequest3).then(function (result) {
                        console.log("\nINSERTION BDD time_Data")
                        res.json({"message":"succeed"})
                    })*/

                }
            })


        }
    })
})




module.exports = router