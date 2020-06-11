const express = require('express')
const userAPI = require('./userAPI')
const laposteAPI = require('../router/Widgets/laposteAPI')
const dayGifAPI = require('../router/Widgets/dayGifAPI')
const newsAPI = require('../router/Widgets/newsAPI')
const crypto = require('crypto')

module.exports = app => {
    process.env.SECRET_JWT = crypto.randomBytes(64).toString('hex') // Génère la clé privée

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/api/user', userAPI)
    app.use('/api/widget/laposte', laposteAPI)
    app.use('/api/widget/dayGif', dayGifAPI)
    app.use('/api/widget/news', newsAPI)

    //require('./dataRefresh');
}