const { resolve } = require('path')
//const history = require('connect-history-api-fallback')
const express = require('express')
const configureAPI = require('./configure')

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/dist/"));

// API
configureAPI(app)

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port);