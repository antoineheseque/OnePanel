const express = require('express')
const userAPI = require('./userAPI')
const widgetAPI = require('./widgetAPI')
const dayGifAPI = require('./Widgets/dayGifAPI')
const crypto = require('crypto')

module.exports = app => {
    process.env.SECRET_JWT = crypto.randomBytes(64).toString('hex') // Génère la clé privée

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/api/user', userAPI)
    app.use('/api/widgets', widgetAPI)
    app.use('/api/widget/dayGif', dayGifAPI)
}