const sql = require('./bdd')
var mysql = require('mysql');
const fetcha = require('fecha')

// Importer les Widgets
const dayGif = require('./Widgets/dayGif')
const news = require('./Widgets/news')
const horoscope = require('./Widgets/horoscope')
const citations = require('./Widgets/citations')
const classementLigue1 = require('./Widgets/classementLigue1')
const bitcoin = require('./Widgets/bitcoin')

function refreshAPI(){
    // On Récupère tout les widgets
    getWidgets().then((res) => {
        for(let id in res){
            let widget = res[id]

            if(needRefresh(widget.lastUpdate, widget.syncTime)){
                switch (widget.id) {
                    case "day-gif":
                        dayGif.createImage()
                        break;
                    case "bitcoin":
                        bitcoin.addBitcoinDay()
                        break;
                    case "news":
                        news.getNewsAPI()
                        break;
                    case "horoscope":
                        horoscope.update_horoscope()
                        break;
                    case "day-citation":
                        citations.createCitation()
                        break;
                    case "classement":
                        classementLigue1.updateFoot()
                        break;

                }

                // On update la date d'actualisation
                refreshWidget(widget.id)
            }
        }
    })

    setTimeout(refreshAPI, 600000); // 600000 -> 10min soit minimum d'actualisation
}

// Démarre le refresh
refreshAPI()

function getWidgets(){
    return new Promise((r) => {
        sql.request(`SELECT * FROM \`widgets\``).then((result) => {
            r(result)
        })
    });
}

function refreshWidget(id){
    var request = "UPDATE \`widgets\` SET lastUpdate=CURRENT_TIMESTAMP WHERE id=?"
    var completeRequest = mysql.format(request, [id]);
    sql.request(completeRequest);
}

function needRefresh(previousRefresh, time){
    let date2 = new Date()
    let diffMinutes = dateDiffInHours(previousRefresh, date2)
    let data = time <= diffMinutes

    return data
}

function dateDiffInHours(a, b) { // Faire attention aux timezone
    const utc1 = Date.UTC(a.getFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
    const utc2 = Date.UTC(b.getFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds());

    return Math.round((utc2 - utc1) / 1000 / 60)
}