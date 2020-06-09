var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getImage", (req, res) => {
    //TODO: APPEL BASE DE DONNEE ET RETOURNER L'URL DE L'IMG EN .JSON
    res.json({'image':"MESSAGE"})// res.json({"image":url})

});

router.get("/testIMAGE", (req, res) => {
    //TODO: APPEL BASE DE DONNEE ET RETOURNER L'URL DE L'IMG EN .JSON
    // res.json({"image":url})
    res.json({'image':"MESSAGE"})
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