const express = require('express')
const userAPI = require('./userAPI')
const laposteAPI = require('./Widgets/laposteAPI')
const dayGifAPI = require('./Widgets/dayGifAPI')
const newsAPI = require('./Widgets/NewsAPI')
const crypto = require('crypto')

module.exports = app => {
    process.env.SECRET_JWT = crypto.randomBytes(64).toString('hex') // Génère la clé privée

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/api/user', userAPI)
    app.use('/api/widget/laposte', laposteAPI)
    app.use('/api/widget/dayGif', dayGifAPI)
    app.use('/api/widget/news', newsAPI)
}