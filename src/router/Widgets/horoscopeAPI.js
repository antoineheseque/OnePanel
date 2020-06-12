var express = require('express')
var router = express.Router()
var mysql = require('mysql');
const sql = require('../../server/bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getHoroscope", (req, res) => {

    //TODO: SELECTIONNE LA PHRASE ASSOCIER AU SIGNE ASTROLOGIQUE DEPUIS LA BDD ET LA RENVOIE

    const signe =getAstrologicalSign();

    //demande la phrase dans la BDD

    //sql.request(`SELECT ${signe} from \`Horoscope\``)

    var request = "SELECT ? from \`Horoscope\`"
    var completeRequest = mysql.format(request, [signe]);
    sql.request(completeRequest).then(function (result) {
        console.log("\nreponse_select_phrase_horoscope=")
        console.log(result[0])

        res.json({"horoscope": result[0]})
    })
});



module.exports = router