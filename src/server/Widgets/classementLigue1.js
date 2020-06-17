const axios = require('axios');
var mysql = require('mysql');
const sql = require('../bdd');

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////


function updateFoot() {

    let config = {
        headers: {
            "X-Auth-Token": "91a5c40be11745eb9e97a8707f058a2a"
        }
    }

    axios.get("https://api.football-data.org/v2/competitions/2015/standings", config).then(function (r) {
        const classement_API = JSON.stringify(r.data); // CONTIENT LE CLASSEMENT
        //console.log("\nclassementAPI=")
        //console.log(classement_API)

        var request = "UPDATE \`Foot\` SET Classement=?, Date_foot=CURRENT_TIMESTAMP WHERE id=1"
        var completeRequest = mysql.format(request, [classement_API]);
        sql.request(completeRequest).then(function (result) {
            //console.log("\nUPDATE CLASSEMENT GOOD")
        }).catch(function (r) {
            return false
        });

    }).catch(function (result) {
        return false
    })
}


module.exports = {
    updateFoot: () => {
        return updateFoot()
    }
}