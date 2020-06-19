var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getCitation", (req, res) => {

    //demande une citation et l'auteur dans la BDD

    sql.request(`SELECT Citation_jour, Auteur, date_citation from \`Citations\` WHERE id ='1' LIMIT 1`).then(function (result){
        //console.log("\nresult getCitation=")
        //console.log(result[0])
        res.json({"citations":result[0]})

    })
});

module.exports = router