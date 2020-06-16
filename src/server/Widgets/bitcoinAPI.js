var express = require('express')
var router = express.Router()
const sql = require('../bdd')
const axios = require('axios');

// serveur -> API

router.get("/upCours", (req, res) => {
    axios.get("https://api.blockchain.info/charts/market-price?timespan=1days&rollingAverage=1hours&format=json").then(function(r){
        const coursDuJour = r.data.values[0].y;
        const date = new Date(r.data.values[0].x * 1000);
        sql.request(`INSERT \`bitcoin\` SET valeur='${coursDuJour} SET date='${date}`).then(function(result){
            res.json({"success":"true"})
        })
    }).catch(function(result){
        console.log(result)
    })
})

//client -> serveur

router.post("/getcours", (req, res)=>{

    sql.request(`SELECT valeur from \`bitcoin\` ORDER BY id DESC LIMIT 7 `).then(function(result){
        res.json.clear();
        for(var k=0;k<7;k++){
            res.json.push({k:result[k].valeur})
        }
    })
});

module.exports = router