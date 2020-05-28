const { resolve } = require('path')
const express = require('express')
const configureAPI = require('./configure')
const history = require('connect-history-api-fallback')

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// API
configureAPI(app)

const publicPath = resolve(__dirname, '../../dist')
app.use(express.static(publicPath));

app.use('/', history());

app.get(/.*/, function (req, res) {
    res.sendFile(publicPath + "/index.html");
});

app.listen(port, () => console.log(`Serveur démarré sur le port ${port}!`));