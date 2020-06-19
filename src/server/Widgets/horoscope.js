var mysql = require('mysql');
const sql = require('../bdd');

var sentences = require('../../assets/json/Horoscope.json')

function getRandom (max) {
    return parseInt(Math.random() * (max))
}

function randomizeTxt(sentence) {
    var regex = /<[a-zA-Z0-9]*>/;

    while(regex.test(sentence)){
        var str = (regex[Symbol.match](sentence))[0]
        if(sentences[str] != undefined) {
            var otherStr = sentences[str][getRandom(sentences[str].length)];
            sentence = sentence.replace(regex, otherStr);
        }
        else{
            sentence = sentence.replace(/<[a-zA-Z0-9]*>/, '►UNDEFINED‼◄');
        }
    }
    return sentence
}

function update_horoscope(){
    let request = "UPDATE \`horoscope\` SET Verseau= ? , Poisson= ? , Bélier=?, Taureau=?, Gémeaux=?, Cancer=?, Lion=?, Vierge=?, Balance=?, Scorpion=?, Sagittaire=?, Capricorne=? WHERE id=1"
    let data = []
    for(let i = 0; i < 12; i++){
        data[i] = JSON.stringify(generateSentences())
    }

    let completeRequest = mysql.format(request, data);
    sql.request(completeRequest)
}

function generateSentences(){
    let sentences={
        "love":'Vous <verbeA>',
        "work":'Vous <verbeT>',
        "health":'Vous <verbeS>'
    }

    sentences.love = randomizeTxt(sentences.love)
    sentences.work = randomizeTxt(sentences.work)
    sentences.health = randomizeTxt(sentences.health)

    return sentences
}


module.exports = {
    update_horoscope: () => {
        return update_horoscope()
    }
}

////////////////////////////////////////////////////////////////////////////


