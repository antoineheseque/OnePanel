var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
var mysql = require('mysql');
const jwt = require("jsonwebtoken")
const axios = require('axios');


///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getAPIPosCalendar", (req, res) => {


    let token = req.body.token
    let eventad = req.body.eventAdress

    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else {//UTILISATEUR VALIDE

       //Récup position de l'évent + appel météo et itineraire si OK
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${eventad}&key=8683c1d8657d40069fd08852599feaef`).then(function (r) {
                const pos = r.data;

                res.json({"pos": pos})
            }).catch(function (result) {
                return false
            })
        }
    })
})



router.post("/getAPIMeteoCalendar", (req, res) => {


    let token = req.body.token
    let lat= req.body.coordslat
    let lng= req.body.coordslng

    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else {//UTILISATEUR VALIDE

            //appel météo
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly&appid=e77b050b2d9e74f5008e2cc553cf92b9&units=metric&lang=fr`).then(function (r) {
                const mete = r.data;

                res.json({"mete": mete})
            }).catch(function (result) {
                return false
            })
        }
    })
})


router.post("/getAPIItineraryCalendar", (req, res) => {


    let token = req.body.token
    let lat= req.body.coordslat
    let lng= req.body.coordslng
    let locationlat= req.body.ourLocationlat
    let locationlong= req.body.ourLocationlon


    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else {//UTILISATEUR VALIDE

            //appel météo
            axios.get(`https://maps.open-street.com/api/route/?origin=${locationlat.toFixed(10)},${locationlong.toFixed(10)}&destination=${lat},${lng}&mode=driving&key=1b83806fc9844c5ab47c094a3b8007e0`).then(function (r) {
                const Iti = r.data

                res.json({"Iti": Iti})
            }).catch(function (result) {
                return false
            })
        }
    })
})


router.post("/getAgenda", (req, res) => {

    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT Calendar FROM \`Agenda\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {

                if (result[0] === undefined) { // BDD VIDE

                    var request3 = "INSERT INTO \`Agenda\` (userID) VALUE (?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3).then(function (result) {
                        res.json({"message":"succeed"})
                    })

                } else { //BDD NON VIDE

                    //ON VA CHERCHER LE CALENDAR DE LA BDD ET ON LE RENVOIE
                    var request4 = "SELECT Calendar FROM \`Agenda\` WHERE userID=?"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4).then(function (result) {
                        res.json({"calendar": result})
                    })

                }
            })


        }
    })
})


router.post("/getAgenda2", (req, res) => {

    let token = req.body.token
    let calend = JSON.stringify(req.body.calendar)


    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT Calendar FROM \`Agenda\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {
                if (result.length > 0) { // BDD NON VIDE

                    var request2 = "UPDATE \`Agenda\` SET Calendar=?  WHERE userID=?"
                    var completeRequest2 = mysql.format(request2, [calend, decoded.id]);
                    sql.request(completeRequest2).then(function (result) {
                        res.json({"message":"succeed"})
                    })

                } else { //BDD VIDE
                    console.log("\nPROBLEME GetAgenda2")

                }
            })


        }
    })
})




module.exports = router