const axios = require('axios');
var mysql = require('mysql');
const sql = require('../bdd');

///////////////////////////////////////////////////
// SERVER -> API
///////////////////////////////////////////////////


function createCitation(){
    axios.get("https://quotes.rest/qod?language=en").then(function(r){
        const contents = r.data.contents; // CONTIENT LA CITATION

        const cita_author = contents.quotes;

        var request = "UPDATE \`Citations\` SET Citation_jour=?, Auteur=?, date_citation=? WHERE id=1"
        var completeRequest = mysql.format(request, [cita_author[0].quote,cita_author[0].author,cita_author[0].date]);
        sql.request(completeRequest);

    }).catch(function(err){
        console.log(err)
    })
}

module.exports = {
    createCitation: () => {
        return createCitation()
    }
}