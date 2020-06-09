var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getImage", (req, res) => {

    //fonction qui demande l'url d'une image dans la BDD

    sql.request(`SELECT Lien from \`Gif_du_jour\` WHERE id ='1' LIMIT 1`).then(function (result){

        console.log("\nselection_url_image_bdd=")
        console.log(result[0].Lien)

        res.json({"image":result[0].Lien})
    })
});

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

router.post("/createImage", (req, res) => {

    fetch('https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1', {
        method: 'GET'
    }).then(function (res) {
        return res.json()
    }).then(function (data) {
        const image_API = data[0]["media"][0]["gif"]["url"]; // CONTIENT L'URL DE L'IMAGE
        console.log("\nimage_API=")
        console.log(image_API)

        //SI LA TABLE EST VIDE, ON AJOUTE UNE PREMIERE IMAGE SINON ON UPDATE JUSTE LA TABLE
        sql.request('SELECT * FROM \`Gif_du_jour\` WHERE Lien IS NULL').then(function(result){
            console.log("\nresult_table_null?=")
            console.log(result)

            if (result === null || result === undefined) {
                //fonction qui envoie l'url de l'image reçu de l'API dans la BDD LA PREMIERE FOIS
                sql.request(`INSERT INTO \`Gif_du_jour\`(Lien) VALUE('${image_API}')`);
            } else {
                //fonction qui update la bdd à chaque actualisation
                sql.request(`UPDATE \`Gif_du_jour\` SET (Lien) VALUE('${image_API}') WHERE id=1 LIMIT 1`);
            }
        })
        console.log("Chargement API Gif")
    })
});

module.exports = router