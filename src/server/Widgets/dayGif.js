const axios = require('axios');
var mysql = require('mysql');
const sql = require('../bdd')

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////
// POUR CREER L'IMAGE: /api/widget/daygif/createImage

function createImage(){
    axios.get("https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1").then(function(r){
        const image_API = r.data.results[0]["media"][0]["gif"].url; // CONTIENT L'URL DE L'IMAGE
        console.log("\ngifAPI=")
        console.log(image_API)

        //sql.request(`UPDATE \`dayGif\` SET url='${image_API}' WHERE id=1`)
        var request = "UPDATE \`dayGif\` SET url=? WHERE id=1"
        var completeRequest = mysql.format(request, [image_API]);
        sql.request(completeRequest).then(function (result){
            return true // TOUT EST BIEN QUI FINIT BIEN
        }).catch(function (r){
            return false
        });
    }).catch(function(result){
        return false
    })
}

module.exports = {
    createImage: () => {
        return createImage()
    }
}