const { resolve } = require('path')
//const history = require('connect-history-api-fallback')
const express = require('express')
const configureAPI = require('./configure')

const port = process.env.PORT || 8080;
const app = express();

const publicPath = resolve(__dirname, '../../dist')

// API
configureAPI(app)

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static(publicPath))
//app.use('/', history())

app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port);