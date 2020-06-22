var express = require('express')
var router = express.Router()
const sql = require('./bdd')
var mysql = require('mysql');
const bcrypt = require('bcrypt');
const format = require('fecha');
const jwt = require("jsonwebtoken")
const multer = require("multer")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../../public/img/profiles/");
    },
    filename: (req, file, cb) => {
        let extension = file.originalname.match(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i);
        let fileName = req.body.newFileName + extension[0]
        req.body.fileName = fileName
        cb(null, fileName)
    }
})
var upload = multer({storage:storage,
    fileFilter: (req, file, cb) => {
        let token = req.body.token

        // ON REGARDE SI TOKEN VALIDE ET ON RECUPERE ID UTILISATEUR
        jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
            if (decoded !== undefined) // Utilisateur valide
            {
                let id = decoded.id
                console.log(id)

                let extension = file.originalname.match(/\.(gif|jpe?g|tiff|png|webp|bmp)$/i);


                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {

                    bcrypt.genSalt(10, function(err, salt) { // ON GENERE UN NOM DE FICHIER HASH ( SECURISE )
                        bcrypt.hash("image"+id, salt, function(err, hash) {
                            let key = hash+"_img"
                            key = key.replace(/\//g, "-")
                            req.body.newFileName = key

                            var request = "UPDATE \`users\` SET profilePicture=? WHERE id=?"
                            var completeRequest = mysql.format(request, [key+extension[0],id]);
                            sql.request(completeRequest).then(function (result) {// ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN
                                if (result.affectedRows === 1) {
                                    cb(null, true);
                                }
                            }).catch((err) => {
                                console.log(err)
                                cb(null, false);
                                return cb(new Error('Erreur dans la base de donnée'));
                            });
                        });
                    });


                } else {
                    cb(null, false);
                    return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
                }
            }
        });
    }
}).single('image');

// Accès à la bdd avec sql.base. ...
// J'ai fait une fonction dans bdd.js pour simplifier tout il faut la tester aussi jsp si ca marche
// Pour l'utiliser:

/* ENVOYER UNE REQUETE
sql.request("FROM * IN AEZIOEZI").then((result) => {
    // Résultat de la requete ici;
})
 */

/* CONVERTIR LE MDP LORS DE L'INSCRIPTION
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data.password, salt, function(err, hash) {

    });
});
 */

router.post("/updateProfile", (req, res) => {
    let data = req.body
    data.updated = false

    if(data.password.length <= 3){
        data.reason = "Le mot de passe doit faire plus de 3 caractères."
        res.json(data)
        return;
    }

    /*sql.request(`SELECT * FROM \`users\` WHERE id='${data.id}' LIMIT 1`).then((result) => {*/

    /*sql.request(`UPDATE \`users\` SET username='${data.username}', email='${data.email}', firstName='${data.firstName}', lastName='${data.lastName}', birthdayDate='${date}' WHERE id='${data.id}'`).then((result) => {*/



    var request = "SELECT * FROM \`users\` WHERE id=?"
    var completeRequest = mysql.format(request, [data.id]);
    sql.request(completeRequest).then(function (result){
        if(result.length > 0){ // SI UN UTILISATEUR CORRESPONDS ON COMPARE LES MDP
            bcrypt.compare(data.password, result[0].password, function(err, comparePassword){ // COMPARAISON AVEC LE MOT DE PASSE STOCKE EN BASE DE DONNEE
                if(err) console.log(err)
                else if (comparePassword) { // LES MOTS DE PASSE SONT BON

                    // FORMAT DATE
                    let date = format.format(new Date(data.birthdayDate), 'isoDate')

                    // ON MET A JOUR LA TABLE
                    var request = "UPDATE \`users\` SET username=?, email=?, firstName=?, lastName=?, birthdayDate=? WHERE id=?"
                    var completeRequest = mysql.format(request, [data.username,data.email,data.firstName,data.lastName,date,data.id]);
                    sql.request(completeRequest).then(function (result){
                        data.updated = true
                        data.password = ""
                        res.json(data)
                    }).catch((err) => {
                        if(err.code === "ER_DUP_ENTRY"){
                            data.reason = "Ce nom d'utilisateur existe déjà."
                        }else{
                            data.reason = "Un problème est survenu dans la BDD: ." + err.sqlMessage
                        }
                        res.json(data)
                    });
                } else {
                    data.reason = "Mot de passe incorrect."
                    res.json(data)
                }

            });
        }
        else {
            data.reason = "Utilisateur inexistant."
            res.json(data)
        }
    }).catch((err) => {
        console.log("Un problème est survenu dans la BDD")
        console.log(err)
    });
});

router.post("/register", (req, res) => {
    let data = req.body
    data.registered = false

    // ON VERIFIE LES CONDITIONS
    if(data.username.length <= 3){
        data.reason = "Le nom d'utilisateur doit faire plus de 3 caractères."
        res.json(data)
        return;
    }
    if(data.password.length <= 5 || data.password2.length <= 5){
        data.reason = "Le mot de passe doit faire plus de 5 caractères."
        res.json(data)
        return;
    }
    if(data.password !== data.password2){
        data.reason = "Les mots de passe ne sont pas identique."
        res.json(data)
        return;
    }

    // ON INSCRIT L'UTILISATEUR (ON SAURA SI L'UTILISATEUR EXISTE DEJA AVEC LA REPONSE DE LA REQUETE
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
            /*sql.request(`INSERT INTO \`users\` (username, password) VALUES ('${data.username}', '${hash}')`).then((result) => { */// ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN

            var request = "INSERT INTO \`users\` (username,password) VALUES (?,?)"
            var completeRequest = mysql.format(request, [[data.username],[hash]]);
            sql.request(completeRequest).then(function (result) {// ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN
                if (result.affectedRows === 1)
                    data.registered = true
                else
                    data.reason = "Un problème est survenu."
                res.json(data)
            }).catch((err) => {
                if (err.code === 'ER_DUP_ENTRY')
                    data.reason = "Ce nom d'utilisateur existe déjà."
                else
                    data.reason = "Un problème est survenu."
                res.json(data)
            });
        });
    });
});

router.post("/login", (req, res) => {
    let data = req.body
    data.logged = false

    if(data.username.length < 3 || data.password.length <= 3){
        data.reason = "Nom d'utilisateur ou mot de passe incorrect."
        res.json(data)
        return;
    }

    /*sql.request(`SELECT * FROM \`users\` WHERE username='${data.username}' LIMIT 1`).then((result) => */
                    /*sql.request(`INSERT INTO \`logins\` (userID) VALUES ('${data.id}')`).then(() => {*/ // ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN


    var request = "SELECT * FROM \`users\` WHERE username=? LIMIT 1"
    var completeRequest = mysql.format(request, [data.username]);
    sql.request(completeRequest).then(function (result){
        if(result.length > 0){ // SI UN UTILISATEUR CORRESPONDS ON COMPARE LES MDP
            bcrypt.compare(data.password, result[0].password, function(err, comparePassword){ // COMPARAISON AVEC LE MOT DE PASSE STOCKE EN BASE DE DONNEE
                if(err) console.log(err)
                else if (comparePassword) { // LES MOTS DE PASSE SONT BON
                    data = result[0]
                    data.logged = true
                    var request = "INSERT INTO \`logins\` (userID) VALUES (?)"
                    var completeRequest = mysql.format(request, [data.id]);
                    sql.request(completeRequest).then(function (result){// ENVOI DE L'UTILISATEUR DANS L'HISTORIQUE LOGIN

                        const token = jwt.sign({ id: data.id }, process.env.SECRET_JWT,{ algorithm: "HS256", expiresIn: '7200s' });

                        data.token = token
                        res.json(data);

                    }).catch((err) => {
                        console.log("Un problème est survenu dans la BDD")
                        //console.log(err)
                    });

                } else {
                    data.reason = "Nom d'utilisateur ou mot de passe incorrect."
                    res.json(data)
                }
            });
        }
        else {
            data.reason = "Nom d'utilisateur ou mot de passe incorrect."
            res.json(data)
        }
    }).catch((err) => {
        console.log("Un problème est survenu dans la BDD")
        //console.log(err)
    });
});

router.post("/verifyToken", (req, res) => {
    let data = req.body

    jwt.verify(data.token, process.env.SECRET_JWT, function(err, decoded) {
        if(decoded === undefined)
            res.json({'isVerified':"false"})
        else {
            if(data.needProfile === "false")
                res.json({'isVerified':"true"})
            else{
                /*sql.request(`SELECT * FROM \`users\` WHERE id='${decoded.id}' LIMIT 1`).then((result) => */

                var request = "SELECT * FROM \`users\` WHERE id=? LIMIT 1"
                var completeRequest = mysql.format(request, [decoded.id]);
                sql.request(completeRequest).then(function (result){
                    if (result.length > 0) { // SI UN UTILISATEUR CORRESPONDS ON COMPARE LES MDP
                        let profile = result[0];
                        result.password = ""; // Aucune utilité d'envoyer le password
                        res.json({'isVerified':'true', 'profile':profile})
                    }
                    else
                        res.json({'isVerified':"false"})
                })
            }
        }
    });
});

router.post("/addWidget", (req, res) => {
    let widgetID = req.body.id
    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if (decoded === undefined) // Utilisateur valide
        {
            res.json({"success":"false", "reason":"Token non valide, veuillez vous reconnecter"})
        } else {
            var request = "SELECT widgets FROM \`users\` WHERE id=? LIMIT 1"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then((result) => {
                let widgetList = {}
                widgetList = JSON.parse(result[0].widgets); // Contient le JSON des données perso utilisateur
                let widgetData = "" // Contient JSON associé au widget à ajouter

                var request = "SELECT * FROM \`widgets\` WHERE id=? LIMIT 1"
                var completeRequest = mysql.format(request, [widgetID]);
                sql.request(completeRequest).then((SQLwidgetData) => {
                    // Récupération des données sur le widget voulu
                    widgetData = SQLwidgetData[0]

                    //console.log("Widget to add: " + widgetID)
                    //console.log(widgetList.widgets)
                    // Ajout du widget dans la liste des widgets de l'utilisateur
                    let data = {
                        "id":widgetID,
                        "x":(widgetList.widgets !== undefined) ? Object.keys(widgetList.widgets).length : 0,
                        "w":widgetData.w,
                        "h":widgetData.h
                    }
                    widgetList.widgets.push(data)

                    //console.log(widgetList.widgets)

                    var request = "UPDATE \`users\` SET widgets=? WHERE id=?"
                    var completeRequest = mysql.format(request, [JSON.stringify(widgetList), decoded.id]);
                    sql.request(completeRequest).then((SQLupdatedData) => {
                        // Données mises a jours sur le site, on renvoi les infos du widget au client
                        res.json({"success":"true"})
                    }).catch((res) => {
                        //console.log(res)
                        res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
                    })
                }).catch((res) =>{
                    //.log(res)
                    res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
                })

                // On renvoi un JSON pour le widget pret à afficher

                // Return result
                //res.json(data)
            }).catch((err) => {
                //console.log(err)
                res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
            });
        }
    });
});

router.post("/loadWidgets", (req, res) => {
    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if (decoded === undefined) // Utilisateur valide
        {
            //console.log("Token non valide")
            res.json({"success":"false","reason":"Token non valide, veuillez vous reconnecter"})
        } else {
            // Token VALIDE

            // ON RECUPERE LES DONNES DES WIDGETS DE L'UTILISATEUR
            var request = "SELECT widgets FROM \`users\` WHERE id=? LIMIT 1"
            var query = mysql.format(request, [decoded.id]);
            sql.request(query).then((result) => {
                let list = JSON.parse(result[0].widgets).widgets // Stocké dans "list" // TABLEAU

                var request = "SELECT * FROM \`widgets\`"
                var query = mysql.format(request);
                sql.request(query).then((result) => {
                    let widgetList = result // ON RECUPERE LA LISTE DE TOUT LES WIDGETS ET ON LES ENTRE DANS LE JSON UN PAR UN
                    let widgets = [] // Résultat final

                    for(let widgetID in widgetList){ // ON PARCOURS TOUT LES WIDGETS QU'IL Y A
                        let widgetData = widgetList[widgetID]

                        let data = {
                            "id":widgetData.id,
                            "name":widgetData.name,
                            "description":widgetData.description,
                            "image":widgetData.image,
                            "x":"0",
                            "w":widgetData.w,
                            "h":widgetData.h,
                            "visible":false
                        }

                        // ON REGARDE SI LE WIDGET EST AUSSI DANS LA LISTE DE L'UTILISATEUR

                        if(list != "null" && list !== undefined){
                            if(list.some(item => item.id == widgetData.id)){
                                let personnalized = list.filter(item => item.id == widgetData.id)
                                data.x = personnalized[0].x
                                data.w = personnalized[0].w
                                data.h = personnalized[0].h
                                data.visible = true
                            }
                        }

                        widgets.push(data)
                    }
                    //console.log(widgets)
                    res.json({"success":"true","widgets":JSON.stringify(widgets)})
                }).catch((err) => {
                    //console.log(err)
                    res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
                })
            }).catch((err) => {
                //console.log(err)
                res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
            });
        }
    });
});

router.post("/removeWidget", (req, res) => {
    let widgetID = req.body.id
    let token = req.body.token

    // Vérification de l'utilisateur
    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if (decoded === undefined) // Utilisateur valide
        {
            res.json({"success":"false", "reason":"Token non valide, veuillez vous reconnecter"})
        } else {
            var request = "SELECT widgets FROM \`users\` WHERE id=? LIMIT 1"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then((result) => {
                let userWidgets = JSON.parse(result[0].widgets)
                //console.log("Widget to remove: " + widgetID)
                //console.log(userWidgets)
                var index = userWidgets.widgets.findIndex(element => element.id === widgetID)
                //console.log(index)
                userWidgets.widgets.splice(index,1)
                //console.log(userWidgets)
                var request = "UPDATE `users` SET widgets=? WHERE id=?"
                var completeRequest = mysql.format(request, [JSON.stringify(userWidgets), decoded.id]);
                sql.request(completeRequest).then((result) => {
                    res.json({"success":"true"})
                })
            }).catch((err) => {
                console.log(err)
                res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
            });
        }
    });
});

router.post("/updateImg", upload,(req, res) => {
    console.log(req.body.fileName)
    res.send({"fileName":req.body.fileName})
});

router.post("/removeImg", upload,(req, res) => {
    let token = req.body.token

    jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
        if (decoded === undefined) // Utilisateur valide
        {
            res.json({"success":"false", "reason":"Token non valide, veuillez vous reconnecter"})
        } else {
            var request = "UPDATE `users` SET profilePicture=NULL WHERE id=?"
            var completeRequest = mysql.format(request, [decoded.id]);
            sql.request(completeRequest).then((result) => {
                res.json({"success":"true"})
            }).catch((err) => {
                console.log(err)
                res.json({"success":"false", "reason":"Problème dans la base de donnée: " + err})
            });
        }
    });
});

module.exports = router