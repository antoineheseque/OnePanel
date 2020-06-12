var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getNews", (req, res) => {

    //TODO: SELECTIONNE LES NEWS DEPUIS LA BDD ET RENVOIE LE FICHIER JSON

    //fonction qui demande les news dans la BDD

    sql.request(`SELECT News from \`Day_News\` WHERE id ='1'`).then(function (result) {
        let data = JSON.parse(result[0].News)
        res.json({"news": data})
    })
});

module.exports = router