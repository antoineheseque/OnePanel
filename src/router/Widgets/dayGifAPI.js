var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getImage", (req, res) => {

    //fonction qui demande l'url d'une image dans la BDD

    sql.request(`SELECT url from \`dayGif\` WHERE id ='1' LIMIT 1`).then(function (result){
        res.json({"image":result[0].url})
    })
});

module.exports = router