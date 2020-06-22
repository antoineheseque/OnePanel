const axios = require('axios');
var mysql = require('mysql');
const sql = require('../bdd')

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

//TODO: APPELER L'API ET L'UPDATE DANS LA BDD

// La fonction getNews nous donne les news depuis l'API


function getNewsAPI(){
    axios.get("https://newsapi.org/v2/top-headlines?country=fr&apiKey=3cff78090d1240b5ae70dbbb310250c9").then(function(r){
        const news = JSON.stringify(r.data.articles);

        var request = "UPDATE \`dayNews\` SET News=? WHERE id=1"
        var completeRequest = mysql.format(request, [news]);
        sql.request(completeRequest);
    }).catch(function(err){
        console.log(err);
    })
}



module.exports = {
    getNewsAPI: () => {
        return getNewsAPI()
    }
}