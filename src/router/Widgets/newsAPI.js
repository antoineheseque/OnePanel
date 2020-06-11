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

    sql.request(`SELECT News from \`Day_News\` WHERE id ='1' LIMIT 1`).then(function (result) {
        console.log("\nreponse_getNews=")
        console.log(result[0].News)

        let data = JSON.parse( result[0].News)

        console.log("\ndata=")
        console.log(data)
        res.json({"news": data})
    })
});

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

/*router.get("/createNews", (req, res) => {
    //TODO: APPELER L'API ET L'UPDATE DANS LA BDD
    // La fonction getNews nous donne les news depuis l'API

    axios.get("https://newsapi.org/v2/top-headlines?country=fr&apiKey=3cff78090d1240b5ae70dbbb310250c9").then(function (r) {
        const newsBDD = r.data.articles; // CONTIENT LES NEWS

        //fonction qui update la bdd à chaque actualisation

        sql.request(`UPDATE \`Day_News\` SET (News) VALUE('${newsBDD}') WHERE id=1 LIMIT 1`).then(function (result) {
            res.json({"success": "true"})
        });

    }).catch(function(result) {
            console.log(result)
    })
});

*/

/*
//TODO: APPELER L'API ET L'UPDATE DANS LA BDD

// La fonction getNews nous donne les news depuis l'API

function getNews(){
    return new Promise((r) => {
        fetch('https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1', {
            method: 'GET'
        }).then(function (res) {
            return res.json()
        }).then(function (data) {
            r(data)
            console.log("Chargement API Gif")
        })
    });
}
const news = getNews();

//fonction qui update la bdd à chaque actualisation
function update_news_bdd(){
    sql.request(`UPDATE \`Day_News\` SET (News) VALUE('${news}') WHERE id=1 LIMIT 1`);
}

update_news_bdd()
*/

module.exports = router