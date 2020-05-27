const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist/"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/updateProfile", (req, res) => {
    res.json({ message: "Message reçu!"});
});

app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port);