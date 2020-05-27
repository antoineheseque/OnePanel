var express = require('express')
var router = express.Router()

router.post("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"});
});

router.get('/', function (req, res) {
    res.send('API HOME PAGE')
})
module.exports = router