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
        console.log("\nnewsAPI=")
        console.log(news)

        //sql.request(`UPDATE \`Day_News\` SET News='${news}' WHERE id=1`)

        var request = "UPDATE \`Day_News\` SET News=? WHERE id=1"
        var completeRequest = mysql.format(request, [news]);
        sql.request(completeRequest);


    }).catch(function(result){
        console.log(result);
    })
}



module.exports = {
    getNewsAPI: () => {
        return getNewsAPI()
    }
}


/*function getNews(){
    return new Promise((r) => {
        fetch('https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1', {
            method: 'GET'
        }).then(function (res) {
            return res.json()
        }).then(function (data) {
            r(data)
            console.log("Chargement API Gif")
        })
    });
}


//fonction qui update la bdd à chaque actualisation
function update_news_bdd(){
    sql.request(`UPDATE \`Day_News\` SET (News) VALUE('${news}') WHERE id=1 LIMIT 1`);
}

update_news_bdd()
*/