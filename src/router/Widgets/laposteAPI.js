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
    let data = req.body.packages
    let url = "https://api.laposte.fr/suivi/v2/idships/"

    for(let idx in data){
        url += (idx == 0 ? "" : ",") + data[idx].id
    }
    url += "?lang=fr_FR"

    axios.get(url,{
        headers:{
            'Accept':'application/json',
            'X-Okapi-Key': '8874weIFq8wgWbIIf7OWuS4JKFuimAgGbrfr0dj73ilynG4MphzhBGabV2mL+v6s' // prod key
            // REAL KEY: 8874weIFq8wgWbIIf7OWuS4JKFuimAgGbrfr0dj73ilynG4MphzhBGabV2mL+v6s
            // TEMP KEY: FofD7RTEwFer2PO0dHKuDLeDobxnSYPHZ6ElBGUWtmPmFQtvxlSHANc3zSoeH3GG à regénérer sur le site LaPoste car temporaire
        }
    }).then(function(result){
        // Remplir avec le return message
        for(let idx in data) {
            if (result.data[idx].returnCode == 400 || result.data[idx].returnCode == 104) {
                data[idx].name = data[idx].id
                data[idx].status = "Le numéro de colis n'a pas été trouvé, veuillez le supprimer."
            } else if(result.data[idx].returnCode == 500 || result.data[idx].returnCode == 504) {
                data[idx].status = "Les services La Poste ne sont pas disponibles, réessayez plus tard."
                data[idx].name = data[idx].id
            } else if(result.data[idx].returnCode == 200){
                let shipmentData = result.data[idx].shipment
                data[idx].url = shipmentData.urlDetail
                data[idx].name = data[idx].id //shipmentData.product
                data[idx].status = shipmentData.event[0].label
            }
        }
        res.json(JSON.stringify({"packages":data}))
    }).catch(function(result){
        res.json(result)
    })
});

module.exports = router