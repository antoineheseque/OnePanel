var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');


router.get("/poste", (req, res) => {
    axios.get("https://api.laposte.fr/suivi/v2/idships/EP111111110FR?lang=fr_FR",{
        headers:{
            'Accept':'application/json',
            'X-Okapi-Key': '8874weIFq8wgWbIIf7OWuS4JKFuimAgGbrfr0dj73ilynG4MphzhBGabV2mL+v6s'
        }
    }).then(function(result){
        res.json(result.response.data)
    }).catch(function(result){
        res.json(result.response.data)
    })
});

module.exports = router