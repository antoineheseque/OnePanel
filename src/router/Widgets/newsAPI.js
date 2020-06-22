var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getNews", (req, res) => {

    //fonction qui demande les news dans la BDD

    sql.request(`SELECT News from \`dayNews\` WHERE id ='1'`).then(function (result) {
        let data = JSON.parse(result[0].News)
        res.json({"news": data})
    })
});

module.exports = router