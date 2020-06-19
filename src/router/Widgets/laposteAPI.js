var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')
const axios = require('axios');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////



///////////////////////////////////////////////////
// CLIENT -> API
///////////////////////////////////////////////////

router.post("/getData", (req, res) => {
    let data = req.body
    console.log(data)
    let url = "https://api.laposte.fr/suivi/v2/idships/"

    for(let d in data){
        console.log(d)
    }
    axios.get("",{
        headers:{
            'Accept':'application/json',
            'X-Okapi-Key': '8874weIFq8wgWbIIf7OWuS4JKFuimAgGbrfr0dj73ilynG4MphzhBGabV2mL+v6s'
        }
    }).then(function(result){
        res.json(result.response.data)
    }).catch(function(result){
        res.json(result)
    })
});

module.exports = router