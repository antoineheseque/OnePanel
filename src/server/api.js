var express = require('express')
var router = express.Router()

router.post("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"});
});
module.exports = router