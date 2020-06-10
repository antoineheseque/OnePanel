var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getImage", (req, res) => {

    //fonction qui demande l'url d'une image dans la BDD

    sql.request(`SELECT url from \`dayGif\` WHERE id ='1' LIMIT 1`).then(function (result){
        res.json({"image":result[0].url})
    })
});

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////
// POUR CREER L'IMAGE: /api/widget/daygif/createImage

router.get("/createImage", (req, res) => {

    axios.get("https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1").then(function(r){
        const image_API = r.data.results[0]["media"][0]["gif"].url; // CONTIENT L'URL DE L'IMAGE

        sql.request(`UPDATE \`dayGif\` SET url='${image_API}' WHERE id=1`).then(function (result){
            res.json({"success":"true"})
        });
    }).catch(function(result){
        console.log(result)
    })
});

module.exports = router