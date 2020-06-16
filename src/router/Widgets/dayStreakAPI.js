var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const sql = require('../../server/bdd');
const jwt = require("jsonwebtoken")

///////////////////////////////////////////////////
// CLIENT -> SERVEUR
///////////////////////////////////////////////////

router.post("/getDayStreak", (req, res) => {

    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function (err, decoded) {
        if (decoded === undefined) // Utilisateur invalide
        {
            console.log("Y'A UN PROBLEME")
        } else {

            /*    //REQUETE DONNANT L'ID DE L'UTILISATEUR
            var request1 = "SELECT id FROM \`users\` WHERE id=? LIMIT 1"
            var completeRequest1 = mysql.format(request1, [decoded.id]); //decoded.id
            sql.request(completeRequest1).then((result1) => {*/

            //REQUETE DEMANDANT LE COUNTER ACTUEL ET LA DERNIERE DATE DE CONNEXION DE L'UTILISATEUR
            var request2 = "SELECT date from \`logins\` WHERE userID=? ORDER BY id DESC LIMIT 2"
            var completeRequest2 = mysql.format(request2, [decoded.id]);
            sql.request(completeRequest2).then(function (result2) {
                console.log("\nresult_select_date =")
                console.log(result2)


                var date = (new Date()).toISOString().slice(0, 10);
                console.log("\ndate =")
                console.log(date)

                var dateBDD= (result2[1].date).toISOString().slice(0, 10);
                console.log("\ndateBDD =")
                console.log(dateBDD)


               //TODO: SI ON A DEJA UPDATE AU MOINS 1 FOIS TODAY --> ON FAIT RIEN JUSQUE DEMAIN MEME SI LA PAGE EST RECHARGEE
                //TODO: AUSSI YA UN TEMPS D'AFFICHAGE : LA BDD EST BIEN UPDATE MAIS IL FAUT RAFRAICHIR POUR VOIR LE + 1

                //ON REGARDE SI ON A BESOIN D'AUGMENTER LE COUNTER OU PAS
                if ((date).slice(0, 7) === (dateBDD).slice(0, 7) && Number((date).slice(8, 10)) - 1 === Number((dateBDD).slice(8, 10))) {
                    var request3 = "UPDATE \`logins\` SET counter=counter + 1 WHERE userID=? ORDER BY id DESC LIMIT 1"
                    var completeRequest3 = mysql.format(request3, [decoded.id]);
                    sql.request(completeRequest3);

                    console.log("\nOn augmente le counter")
                } else {
                    var request4 = "UPDATE \`logins\` SET counter=0 WHERE userID=? ORDER BY id DESC LIMIT 1"
                    var completeRequest4 = mysql.format(request4, [decoded.id]);
                    sql.request(completeRequest4);
                }

                var request5 = "SELECT counter from \`logins\` WHERE userID=? ORDER BY id DESC LIMIT 1"
                var completeRequest5 = mysql.format(request5, [decoded.id]);
                sql.request(completeRequest5).then(function (result5) {
                    console.log("\nresult_select_counter =")
                    console.log(result5[0].counter)
                    res.json({"daystreak": result5[0].counter})
                })

            }).catch((err) => {
                console.log(err)
            })
        }
    })
})












/*var request2 = "SELECT date FROM \`logins\` WHERE userID=? ORDER BY date DESC LIMIT 1"
              var completeRequest2 = mysql.format(request2, [result1]);
              sql.request(completeRequest2).then((result3) => {
                  console.log("\nresult_date_co=")
                  console.log(result3)*/

//req.body.date_actuelle = ((req.body.date_actuelle).toISOString()).slice(0, 10)
//console.log(this.date_actuelle)



/*router.post("/resetDayStreak", (req, res) => {

    var id_utilisateur = req.body.data

    //reset

    var request = "UPDATE \`logins\` SET Counter=0 WHERE userID=?"
    var completeRequest = mysql.format(request, [id_utilisateur]);
    sql.request(completeRequest);
});

/*router.post("/updateCounter", (req, res) => {

    const id_utilisateur = User.profile.id

    var request = "UPDATE \`Day_Streak\` SET Counter = Counter + 1 WHERE id=? LIMIT 1"
    var completeRequest = mysql.format(request, [id_utilisateur]);
    sql.request(completeRequest);

});*/

module.exports = router