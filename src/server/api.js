var express = require('express')
var router = express.Router()

router.post("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"})
});

router.post("/signIn", (req, res) => {
    let data = req.body
    data.registered = true
    res.json(data)
});

router.post("/login", (req, res) => {
    let data = req.body
    data.logged = true
    res.json(data);
});

router.post("/logout", (req, res) => {
    let data = req.body
    data.logged = false
    res.json(data);
});

module.exports = router