var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const sql = require('../../server/bdd');

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getHoroscope", (req, res) => {
    var sign = req.body.data

    var request = "SELECT ?? from \`horoscope\`"
    var completeRequest = mysql.format(request, [sign]);
    sql.request(completeRequest).then(function (result) {
        res.json({"horoscope": Object.values(result[0])[0]})
    })
});



module.exports = router