const sql = require('./bdd')
const dayGif = require('./Widgets/dayGif')
const fetcha = require('fecha')

function refreshAPI(){
    // On Récupère tout les widgets
    getWidgets().then((res) => {
        console.log(res)
        for(let id in res){
            let widget = res[id]

            if(needRefresh(widget.lastUpdate, widget.syncTime)){
                switch (widget.id) {
                    case "dayGif":
                        dayGif.createImage()
                        break;
                    case "news":
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
    let date2 = fetcha.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    sql.request(`UPDATE \`widgets\` SET lastUpdate='${date2}' WHERE id='${id}'`).then((result) => {
        r(result)
    })
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