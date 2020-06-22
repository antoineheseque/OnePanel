var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
var mysql = require('mysql');
const axios = require('axios');
const jwt = require("jsonwebtoken")

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getPokemon", (req, res) => {

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
            var request = "SELECT pokemon_catch FROM \`Pokemon\` WHERE userID=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then(function (result) {
                console.log("\nVERIF BDD VIDE?=")
                console.log(result[0])

                if (result[0] === undefined) { // BDD VIDE

                    console.log("\ngetPokemon BDD VIDE")

                    var request3 = "INSERT INTO \`Pokemon\` (userID) VALUE (?)"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3).then(function (result) {
                        console.log("\nINSERTION BDD PokemonCatch")

                        var date =new Date();
                        (date).setDate((date).getDate()-1)



                        var request2 = "UPDATE \`Pokemon\` SET date_pokemon=?  WHERE userID=?"
                        var completeRequest2 = mysql.format(request2, [date, decoded.id]);
                        sql.request(completeRequest2).then(function (result) {
                            console.log("\nUPDATE BDD date_pokemon")
                        })

                        /*var request5 = "SELECT pokemon_catch,date_pokemon FROM \`Pokemon\` WHERE userID=?"
                        var completeRequest5 = mysql.format(request5, [decoded.id]);
                        sql.request(completeRequest5).then(function (result) {
                            console.log("\nresult select pokemon_catch,date_pokemon=")
                            console.log(result)
                            res.json({"pokemonCatch": result})
                        })*/

                    })

                } else { //BDD NON VIDE

                    //ON VA CHERCHER LE POKEMON_CATCH DE LA BDD ET ON LE RENVOIE
                    var request4 = "SELECT pokemon_catch,date_pokemon FROM \`Pokemon\` WHERE userID=?"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4).then(function (result) {
                        console.log("\nresult select pokemon_catch,date_pokemon=")
                        console.log(result)
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



    console.log("\npokemon_catch_getPokemon2=")
    console.log(pokemon_catch)

    console.log("\ndate_poke_getPokemon2=")
    console.log(date_poke)



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
                console.log("\nresult_select_pokemon_catch_GetPokemon2")
                console.log(result)
                if (result.length > 0) { // BDD NON VIDE

                    var request2 = "UPDATE \`Pokemon\` SET pokemon_catch=?, date_pokemon=?  WHERE userID=?"
                    var completeRequest2 = mysql.format(request2, [pokemon_catch, date_poke, decoded.id]);
                    sql.request(completeRequest2).then(function (result) {
                        console.log("\nUPDATE BDD pokemon_catch")
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