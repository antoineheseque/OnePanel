const axios = require('axios');
var mysql = require('mysql');
const sql = require('../bdd');
const format = require('fecha');

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

function addBitcoinDay(){
    axios.get("https://api.blockchain.info/charts/market-price?timespan=1days&rollingAverage=1days&format=json").then(function(r){
        const content = r.data;

        if(content.status == "ok"){
            let request = "INSERT INTO \`bitcoin\` (date,value) VALUES (?,?)"
            let date = format.format(new Date(content.values[0].x*1000), 'isoDate')
            console.log(date)

            let completeRequest = mysql.format(request, [date, content.values[0].y]);
            sql.request(completeRequest).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
        }

    }).catch(function(err){
        console.log(err)
    })
}

module.exports = {
    addBitcoinDay: () => {
        return addBitcoinDay()
    }
}