var express = require('express')
var router = express.Router()
const sql = require('../../server/bdd')

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getData", (req, res)=>{
    let values = []
    sql.request(`SELECT * from \`bitcoin\` ORDER BY date DESC LIMIT 90`).then(function(result){
        let data = result
        console.log(data)

        let numbers = []
        let labels = []

        // BLOC 7 JOURS
        for(let i = 0; i < 7; i++){
            let date = new Date(data[i].date)
            date.setHours(date.getHours()+2)
            let monthStr = date.getMonth() + 1
            labels.push(date.getDate() + "/" + monthStr + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        let value={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":[...numbers].reverse(),
            "labels":[...labels].reverse()
        }
        console.log(value)
        values.push(value)

        // BLOC 30 JOURS
        for(let i = 7; i < 30; i++){
            let date = new Date(data[i].date)
            date.setHours(date.getHours()+2)
            let monthStr = date.getMonth() + 1
            labels.push(date.getDate() + "/" + monthStr + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        let value2 ={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":[...numbers].reverse(),
            "labels":[...labels].reverse()
        }
        values.push(value2)

        // BLOC 90 JOURS
        for(let i = 7; i < 30; i++){
            let date = new Date(data[i].date)
            date.setHours(date.getHours()+2)
            let monthStr = date.getMonth() + 1
            labels.push(date.getDate() + "/" + monthStr + "/" + date.getFullYear().toString().substr(-2))
            numbers.push(data[i].value)
        }
        let value3 ={
            "min":Math.min(...numbers),
            "max":Math.max(...numbers),
            "data":[...numbers].reverse(),
            "labels":[...labels].reverse()
        }
        values.push(value3)

        res.json({"values":JSON.stringify(values)})
    })
});

module.exports = router