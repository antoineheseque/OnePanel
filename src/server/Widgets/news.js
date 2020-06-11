///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////

//TODO: APPELER L'API ET L'UPDATE DANS LA BDD

// La fonction getNews nous donne les news depuis l'API


function getNewsAPI(){
    axios.get("https://api.tenor.com/v1/trending?key=EW6KT86NL2K6&limit=1").then(function(r){
        const news = r.data;

        sql.request(`UPDATE \`Day_News\` SET (News) VALUE('${news}') WHERE id=1 LIMIT 1`).then(function (result){
            return true // TOUT EST BIEN QUI FINIT BIEN
        }).catch(function (r){
            return false
        });
    }).catch(function(result){
        return false
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