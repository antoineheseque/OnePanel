const express = require('express')
const userAPI = require('./userAPI')
const laposteAPI = require('../router/Widgets/laposteAPI')
const dayGifAPI = require('../router/Widgets/dayGifAPI')
const newsAPI = require('../router/Widgets/newsAPI')
const horoscopeAPI = require('../router/Widgets/horoscopeAPI')
const dayStreakAPI = require('../router/Widgets/dayStreakAPI')
const citationAPI = require('../router/Widgets/citationAPI')
const classementLigue1API = require('../router/Widgets/classementLigue1API')
const bitcoinAPI = require('../router/Widgets/bitcoinAPI')
const crypto = require('crypto')

module.exports = app => {
    process.env.SECRET_JWT = crypto.randomBytes(64).toString('hex') // Génère la clé privée

    app.use(express.json());
    app.use(express.urlencoded());
    app.use('/api/user', userAPI)
    app.use('/api/widget/laposte', laposteAPI)
    app.use('/api/widget/dayGif', dayGifAPI)
    app.use('/api/widget/news', newsAPI)
    app.use('/api/widget/horoscope', horoscopeAPI)
    app.use('/api/widget/dayStreak', dayStreakAPI)
    app.use('/api/widget/citations', citationAPI)
    app.use('/api/widget/foot', classementLigue1API)
    app.use('/api/widget/bitcoin', bitcoinAPI)

    require('./dataRefresh');
}