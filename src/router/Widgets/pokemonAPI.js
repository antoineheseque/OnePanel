var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
var mysql = require('mysql');
const jwt = require("jsonwebtoken")

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getPokemon", (req, res) => {

    let token = req.body.token
    //let time_Data = req.body.timeData

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT pokemon_catch FROM \`Pokemon\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {

                if (result[0] === undefined) { // BDD VIDE

                    var request3 = "INSERT INTO \`Pokemon\` (userID) VALUE (?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3).then(function (result) {
                        var date =new Date();
                        (date).setDate((date).getDate()-1)



                        var request2 = "UPDATE \`Pokemon\` SET date_pokemon=?  WHERE userID=?"
                        var completeRequest2 = mysql.format(request2, [date, decoded.id]);
                        sql.request(completeRequest2).then(function (result) {
                        })

                    })

                } else { //BDD NON VIDE

                    //ON VA CHERCHER LE POKEMON_CATCH DE LA BDD ET ON LE RENVOIE
                    var request4 = "SELECT pokemon_catch,date_pokemon FROM \`Pokemon\` WHERE userID=?"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4).then(function (result) {
                        res.json({"pokemoncatch": result})
                    })

                }
            })


        }
    })
})


router.post("/getPokemon2", (req, res) => {

    let token = req.body.token
    let pokemon_catch = JSON.stringify(req.body.PokemonCatch)
    let date_poke = new Date(req.body.lastUpdate)

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // UTILISATEUR INVALIDE
        {
            console.log("Y'A UN PROBLEME")
        } else { //UTILISATEUR VALIDE

            //ON REGARDE SI LA BDD EST VIDE OU PAS
            var request = "SELECT pokemon_catch FROM \`Pokemon\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {
                if (result.length > 0) { // BDD NON VIDE

                    var request2 = "UPDATE \`Pokemon\` SET pokemon_catch=?, date_pokemon=?  WHERE userID=?"
                    var completeRequest2 = mysql.format(request2, [pokemon_catch, date_poke, decoded.id]);
                    sql.request(completeRequest2).then(function (result) {
                        res.json({"message":"succeed"})
                    })

                } else { //BDD VIDE
                    console.log("\nPROBLEME GetPokemon2")

                }
            })


        }
    })
})

module.exports = router