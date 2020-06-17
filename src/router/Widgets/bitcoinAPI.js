var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getData", (req, res)=>{
    let values = []
    sql.request(`SELECT * from \`bitcoin\` ORDER BY date DESC LIMIT 90`).then(function(result){
        let data = result.reverse()
        console.log(data)

        let numbers = []
        let labels = []

        // BLOC 7 JOURS
        for(let i = 0; i < 7; i++){
            let date = new Date(data[i].date)
            labels.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        let value={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":numbers,
            "labels":labels
        }

        console.log(value)
        values.push(value)

        // BLOC 30 JOURS
        /*for(let i = 7; i < 30; i++){
            let date = new Date(data[i].date)
            labels.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        value={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":numbers,
            "labels":labels
        }

        console.log(value)
        result.push(value)

        // BLOC 90 JOURS
        for(let i = 7; i < 30; i++){
            let date = new Date(data[i].date)
            labels.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        value={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":numbers,
            "labels":labels
        }

        console.log(value)
        result.push(value)*/

        res.json({"values":JSON.stringify(values)})
    })
});

module.exports = router