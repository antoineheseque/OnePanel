var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getImage", (req, res) => {
    //TODO: APPEL BASE DE DONNEE ET RETOURNER L'URL DE L'IMG EN .JSON
    res.json({'image':"MESSAGE"})
});

router.get("/testIMAGE", (req, res) => {

    fetch('https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1', {
        method: 'GET'
    }).then(function (res) {
        return res.json()
    }).then(function (data) {
        // LIEN IMAGE: data[0]["media"][0]["gif"]["url"]}
        //TODO: A STOCKER DANS LA BDD
        res.json({'image':"MESSAGE"})
    })
});

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

router.post("/createImage", (req, res) => {
    //TODO: APPELER L'API IMAGES
    // https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1
    // UNE FOIS RECUPERE ENREGISTRER L'IMAGE DANS LA BDD ( UPDATE )
});

module.exports = router